import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatModule } from '@shared/modules/mat.module';
import { ToDoService } from '@shared/services/todo.service';
import { InputFieldWithType } from '@shared/models/input-field.model';
import { PipesModule } from '@shared/modules/pipes/pipes.module';
import { ValidationService } from '@shared/services/validation.service';
import { Observable, Subject, timer, combineLatest } from 'rxjs';
import { startWith, map, takeUntil, filter } from 'rxjs/operators';
import { getMsFromTime } from '@shared/utils/time';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ CommonModule, MatModule, PipesModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  providers: [ DatePipe ]
})
export class AddComponent implements OnInit, OnDestroy {

  protected readonly creationForm = new FormGroup<Record<FormNames, FormControl>>({} as Record<FormNames, FormControl>);
  protected readonly disableSaveButton$: Observable<boolean> = this.creationForm.statusChanges.pipe(startWith(this.creationForm.invalid), map(status => status === 'INVALID'));

  private readonly destroy$ = new Subject<any>();
  private readonly today$: Observable<Date> = timer(0, 1000).pipe(map(_ => new Date), takeUntil(this.destroy$));
  private readonly isToday$: Observable<boolean> = this.creationForm.valueChanges.pipe(
    map(value => value.expirationDate),
    map(date => {
      const today: string = new Date().toLocaleDateString();
      const pickedDate: string = date ? new Date(date).toLocaleDateString() : '';
      return today === pickedDate;
    })
  )
  private readonly minDate$: Observable<string> = combineLatest([
    this.today$,
    this.isToday$.pipe(startWith(false))
  ])
  .pipe(
    map(([today, isToday]) => {
      if (isToday) {
        return this.datePipe.transform(today, 'HH:mm') as string;
      } else {
        return '00:00';
      }
    }),
    takeUntil(this.destroy$)
  );

  protected readonly inputFields: InputFieldWithType<FormNames>[] = [
    {
      name: 'title',
      label: 'Title',
      inputType: 'textarea',
      validators: [Validators.required, Validators.maxLength(100)]
    },
    {
      name: 'expirationDate',
      label: 'Expiration date',
      inputType: 'date',
      validators: [Validators.required],
      asyncValidators: [this.validationS.dateBiggerThanToday(this.today$)]
    },
    {
      name: 'expirationTime',
      label: 'Expiration time',
      inputType: 'time',
      asyncValidators: [this.validationS.timeBiggerThanNow(this.today$, 'expirationDate')]
    },
  ]

  constructor(
    private todoS: ToDoService,
    private datePipe: DatePipe,
    private validationS: ValidationService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initForm(){
    this.inputFields.forEach(field => {
      const {disabled, validators, asyncValidators, name} = field;
      const control = new FormControl({value: null, disabled: disabled || false}, validators || [], asyncValidators || []);
      this.creationForm.addControl(name, control);
    })
    const {expirationDate, expirationTime} = this.creationForm.controls;
    expirationDate.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(_ => queueMicrotask(() => expirationTime.setValue(expirationTime.value)));
  }

  protected reset(){
    this.creationForm.reset();
  }

  protected save(){
    const {title, expirationDate, expirationTime} = this.creationForm.value;
    const msTime = expirationTime ? getMsFromTime(expirationTime) : getMsFromTime(expirationTime || '23:59') + 60_000;
    const pickedDateTime = new Date(expirationDate.getTime() + msTime);
    this.todoS.createTodo(title, pickedDateTime)
    this.router.navigate(['list']);
  }

}


type FormNames = 'title' | 'expirationDate' | 'expirationTime';

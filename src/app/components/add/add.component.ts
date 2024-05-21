import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDoService } from '@shared/services/todo.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  protected readonly creationForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    expirationDate: new FormControl(null, [Validators.required]),
    expirationTime: new FormControl(null)
  })
  protected readonly disableSaveButton$: Observable<boolean> = this.creationForm.statusChanges.pipe(startWith(this.creationForm.invalid), map(status => status === 'INVALID'));

  constructor(
    private todoS: ToDoService
  ){

  }



}


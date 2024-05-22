import { Injectable } from '@angular/core'
import { DatePipe } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators'

@Injectable()
export class ValidationService {

  constructor(
    private datePipe: DatePipe
  ){
  }

  public dateBiggerThanToday(todayObs$: Observable<Date>): AsyncValidatorFn {
    return (control: AbstractControl<Date>) => {
      return combineLatest([
        todayObs$.pipe(first()),
        control.valueChanges || of('')
      ]).pipe(map(([today, pickedDate]) => {
        const [d1, m1, y1] = today.toLocaleDateString().split(".").map(v => +v);
        const [d2, m2, y2] = pickedDate.toLocaleDateString().split(".").map(v => +v);
        const year = y1 > y2;
        const month = y1 >= y2 && m1 > m2;
        const day = year || month && d1 > d2;
        return day ? { exceedingDate: true } : null;
      }), first())
    }
  }

  public timeBiggerThanNow(todayObs$: Observable<Date>): AsyncValidatorFn {
    return (control: AbstractControl<string>) => {
      return combineLatest([
        todayObs$,
        control.valueChanges || of('')
      ]).pipe(map(([today, pickedDate]) => {
        if (!pickedDate) {
          return null;
        }
        const [hours, minutes] = (this.datePipe.transform(today, 'HH:mm') as string)?.split(':').map(v => +v);
        const [pickedHours, pickedminutes] = pickedDate.split(':').map(v => +v);
        const isHoursExceeding = hours > pickedHours;
        const isMinutEsexceeding = hours >= pickedHours && minutes > pickedminutes;
        return (isHoursExceeding || isMinutEsexceeding) ? { exceedingTime: true } : null;
      }), first())
    }
  }

}

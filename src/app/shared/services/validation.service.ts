import { Injectable } from '@angular/core'
import { DatePipe } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith, first, take, tap } from 'rxjs/operators'

@Injectable()
export class ValidationService {

  constructor(
    private datePipe: DatePipe
  ){
  }

  public dateBiggerThanToday(todayObs$: Observable<Date>): AsyncValidatorFn {
    return (control: AbstractControl<Date>) => {
      return combineLatest([
        todayObs$,//.pipe(tap(_ => setTimeout(_ => control.setValue()))),
        control.valueChanges || of('')
      ]).pipe(map(([today, pickedDate]) => {
        if (!pickedDate) {
          return null;
        }
        const isInvalid = this.checkTimestamp(today, pickedDate);
        return isInvalid ? { exceedingDate: true } : null;
      }), take(1))
    }
  }

  public timeBiggerThanNow(todayObs$: Observable<Date>, dateControlKey: string): AsyncValidatorFn {
    return (control: AbstractControl<string>) => {
      const dateControl = control.parent?.get(dateControlKey);
      return combineLatest([
        todayObs$,
        control.valueChanges?.pipe(startWith(control.value)) || of(''),
        dateControl?.valueChanges?.pipe(startWith(dateControl?.value)) || of(''),
      ]).pipe(map(([today, pickedTime, pickedDate]) => {
        if (!pickedTime || !pickedDate) {
          return null;
        }
        const isDateInvalid = this.checkTimestamp(today, pickedDate, false);
        const isDateInvalidStrick = this.checkTimestamp(today, pickedDate);
        const isTimeInvalid = this.checkTime(today, pickedTime);
        return (isDateInvalidStrick || (isDateInvalid && isTimeInvalid)) ? { exceedingTime: true } : null;
      }), take(1))
    }
  }

  private checkTimestamp(today: Date, pickedDate: Date, strict: boolean = true): boolean {
    const [d1, m1, y1] = today.toLocaleDateString().split(".").map(v => +v);
    const [d2, m2, y2] = pickedDate.toLocaleDateString().split(".").map(v => +v);
    const firsDate = new Date(y1, m1 - 1, d1);
    const secondDate = new Date(y2, m2 - 1, d2);
    return strict ? firsDate > secondDate : firsDate >= secondDate;
  }

  private checkDate(today: Date, pickedDate: Date): boolean {
    const [d1, m1, y1] = today.toLocaleDateString().split(".").map(v => +v);
    const [d2, m2, y2] = pickedDate.toLocaleDateString().split(".").map(v => +v);
    const year = y1 > y2;
    const month = y1 >= y2 && m1 > m2;
    const day = (year || month) && d1 > d2;
    return day;
  }

  private checkTime(today: Date, pickedTime: String): boolean {
    const [hours, minutes] = (this.datePipe.transform(today, 'HH:mm') as string)?.split(':').map(v => +v);
    const [pickedHours, pickedminutes] = pickedTime.split(':').map(v => +v);
    const isHoursExceeding = hours > pickedHours;
    const isMinutEsexceeding = hours >= pickedHours && minutes > pickedminutes;
    return isHoursExceeding || isMinutEsexceeding;
  }

}

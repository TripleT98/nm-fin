import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, startWith, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'getErrMess'
})
export class GetErrorMessagePipe implements PipeTransform {

  private readonly errors: Record<string, Function> = {
    maxlength(lengths: {actualLength: number, requiredLength: number}){
      const {actualLength, requiredLength} = lengths;
      return `Max length ${requiredLength}. Current ${actualLength}.`
    },
    required(){
      return "Required input!"
    },
    exceedingDate(){
      return `Current date exceeds picked one`
    },
    exceedingTime(){
      return `Current time exceeds picked one`;
    }
  }

  constructor(

  ){
  }

  transform(form: AbstractControl | null): Observable<string | null>{
    return form ? combineLatest([
      form.valueChanges.pipe(startWith(null)),
      form.statusChanges.pipe(startWith(null)),
    ]).pipe(map(_ => {
      const errors = Object.entries(form.errors || {});
      if (!errors?.length) {
        return '';
      }
      const [errorName, errorData] =  errors[0];
      const errorText = (this.errors as any)[errorName]?.(errorData);
      return errorText || '';
    })) : of('');
  }

  public getErrors(){
    return this.errors;
  }

}

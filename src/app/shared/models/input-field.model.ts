import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { TemplateRef } from '@angular/core';

export type InputField<T> = {
  name: T;
  label?: string;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  disabled?: boolean;
}

export interface InputFieldWithTemp<T> extends InputField<T> {
  templateRef: TemplateRef<any>;
}

export interface InputFieldWithType<T> extends InputField<T> {
  inputType: InputType;
}

export type InputType = 'text' | 'textarea' | 'number' | 'date' | 'time' | 'dateTime';

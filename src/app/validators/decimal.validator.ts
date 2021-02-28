import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalValidator(allowNegative: boolean = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const nonNegPattern = /^(([0-9]+[.][0-9]+)|([0-9]+))$/g;
    const negPattern = /^[-]?(([0-9]+[.][0-9]+)|([0-9]+))$/g;
    const pattern = allowNegative ? negPattern : nonNegPattern;

    let valid;
    const value = control.value;

    if (value == 0 || !value) {
      valid = true;
    } else {
      valid = pattern.test(value);
    }
    return valid ? null : { decimal: { value: value } };
  };
}

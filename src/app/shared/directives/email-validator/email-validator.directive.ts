import { Directive } from '@angular/core';
import { FormControl, Validator, NG_VALIDATORS } from '@angular/forms';

export function validateEmail() {
  return (control: FormControl) => {
    const EMAIL_REGEXP = /^\S+@\S+\.\S+$/i;
    return EMAIL_REGEXP.test(control.value)
      ? null
      : {
          validateEmail: {
            valid: false,
          },
        };
  };
}

@Directive({
  selector: '[validateEmail][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validator: Function;

  constructor() {
    this.validator = validateEmail();
  }

  validate(control: FormControl) {
    return this.validator(control);
  }
}

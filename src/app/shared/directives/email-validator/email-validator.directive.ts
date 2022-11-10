import { Directive } from '@angular/core';
import { FormControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { validateEmail } from '../../utils';

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

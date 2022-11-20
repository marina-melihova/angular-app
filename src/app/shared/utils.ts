import { FormControl } from '@angular/forms';

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

export function areSomeValueTrue(elements: boolean[]): boolean {
  return elements.some((el) => el);
}

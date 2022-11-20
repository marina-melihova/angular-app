import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStateFacade } from 'src/app/auth';
import { validateEmail } from '../../shared/utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;

  constructor(public authStateFacade: AuthStateFacade) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.regForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, validateEmail()]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  onSubmit() {
    if (this.regForm.invalid) {
      return;
    }
    this.authStateFacade.register(this.regForm.value);
  }
}

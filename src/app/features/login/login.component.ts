import { LoginResponse } from './../../models/user.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthStateFacade } from 'src/app/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(public authStateFacade: AuthStateFacade) {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authStateFacade.login(form.value);
  }
}

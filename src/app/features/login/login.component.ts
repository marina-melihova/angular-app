import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    form.resetForm();
  }
}

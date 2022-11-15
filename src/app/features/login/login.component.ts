import { LoginResponse } from './../../models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user = {
    email: '',
    password: '',
  };

  isLoading: boolean = false;
  error: string;
  private destroyStream = new Subject<void>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initLoadingState();
  }

  initLoadingState() {
    this.authService.isLoading$.pipe(takeUntil(this.destroyStream)).subscribe((loader) => (this.isLoading = loader));
  }

  onFormSubmit(form: NgForm) {
    this.error = '';

    if (form.invalid) {
      return;
    }

    this.authService
      .login(form.value)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (err: string) => (this.error = err),
      });
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

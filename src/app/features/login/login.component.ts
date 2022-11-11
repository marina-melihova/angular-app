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
  private destroyStream = new Subject<void>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.error$.next('');
    this.initLoadingState();
  }

  initLoadingState() {
    this.authService.isLoading$.pipe(takeUntil(this.destroyStream)).subscribe((loader) => (this.isLoading = loader));
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value);
    this.authService.isAuthorized$.subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/courses']);
      }
    });
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

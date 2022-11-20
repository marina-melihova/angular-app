import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { validateEmail } from '../../shared/utils';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  isLoading: boolean = false;
  error: string;
  private destroyStream = new Subject<void>();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.buildForm();
    this.initLoadingState();
  }

  buildForm() {
    this.regForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, validateEmail()]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  initLoadingState() {
    this.authService.isLoading$.pipe(takeUntil(this.destroyStream)).subscribe((loader) => (this.isLoading = loader));
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
    this.error = '';
    if (this.regForm.invalid) {
      return;
    }
    this.authService
      .register(this.regForm.value)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err: string) => (this.error = err),
      });
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

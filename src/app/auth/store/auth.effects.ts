import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, exhaustMap, catchError, finalize } from 'rxjs';
import * as authActions from './auth.actions';
import { AuthService, SessionStorageService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestLogin),
      exhaustMap((action) =>
        this.authService.login(action.body).pipe(
          map((response) => {
            this.sessionStorage.setToken(response.result);
            this.router.navigate(['/courses']);
            return authActions.requestLoginSuccess({ token: response.result });
          }),
          catchError((err) => of(authActions.requestLoginFail({ error: err.toString() })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestRegister),
      exhaustMap((action) =>
        this.authService.register(action.body).pipe(
          map(() => {
            this.router.navigate(['/login']);
            return authActions.requestRegisterSuccess();
          }),
          catchError((err) => of(authActions.requestRegisterFail({ error: err.toString() })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.requestLogout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          finalize(() => this.router.navigate(['/login'])),
          map(() => authActions.requestLogoutSuccess())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import * as authActions from './auth.actions';
import * as fromAuth from './auth.selectors';
import { User, Credentials } from 'src/app/models';
import { SessionStorageService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthStateFacade {
  getToken$ = this.store.select(fromAuth.getToken);
  isAuthorized$ = this.store.select(fromAuth.isUserAuthorized);
  isLoading$ = this.store.select(fromAuth.isLoading);
  getErrorMessage$ = this.store.select(fromAuth.getSpecificErrorMessage);

  constructor(private store: Store<AuthState>, private sessionStorage: SessionStorageService) {}

  login(body: Credentials) {
    this.store.dispatch(authActions.requestLogin({ body }));
  }

  register(body: User) {
    this.store.dispatch(authActions.requestRegister({ body }));
  }

  logout() {
    this.store.dispatch(authActions.requestLogout());
    this.sessionStorage.deleteToken();
  }

  closeSession() {
    this.store.dispatch(authActions.requestLogoutSuccess());
    this.sessionStorage.deleteToken();
  }

  setAuthorization() {
    if (this.sessionStorage.getToken()) {
      this.store.dispatch(
        authActions.requestLoginSuccess({
          token: this.sessionStorage.getToken() as string,
        })
      );
    }
  }
}

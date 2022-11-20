import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: AuthState = {
  isAuthorized: false,
  token: null,
  isLoading: false,
  errorMessage: '',
};

const reducer = createReducer(
  initialState,
  on(authActions.requestLogin, (state) => ({
    ...state,
    errorMessage: '',
    isLoading: true,
  })),
  on(authActions.requestLoginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthorized: true,
    isLoading: false,
  })),
  on(authActions.requestLoginFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isLoading: false,
  })),
  on(authActions.requestRegister, (state) => ({
    ...state,
    errorMessage: '',
    isLoading: true,
  })),
  on(authActions.requestRegisterSuccess, (state) => ({ ...state, isLoading: false })),
  on(authActions.requestRegisterFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isLoading: false,
  })),
  on(authActions.requestLogout, (state) => ({
    ...state,
    errorMessage: '',
    isLoading: true,
  })),
  on(authActions.requestLogoutSuccess, (state) => ({
    ...state,
    token: '',
    isAuthorized: false,
    isLoading: false,
  }))
);

export const authReducer = (state: AuthState, action: Action): AuthState => reducer(state, action);

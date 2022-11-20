import { createAction, props } from '@ngrx/store';
import { Credentials, User } from 'src/app/models';

export const requestLogin = createAction('[Login] Request Login', props<{ body: Credentials }>());
export const requestLoginSuccess = createAction('[Login] Request Login Success', props<{ token: string }>());
export const requestLoginFail = createAction('[Login] Request Login Fail', props<{ error: string }>());

export const requestRegister = createAction('[Register] Request Register', props<{ body: User }>());
export const requestRegisterSuccess = createAction('[Register] Request Register Success');
export const requestRegisterFail = createAction('[Register] Request Register Fail', props<{ error: string }>());

export const requestLogout = createAction('[Logout] Request Logout');
export const requestLogoutSuccess = createAction('[Logout] Request Logout Success');

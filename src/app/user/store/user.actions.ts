import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';

export const requestCurrentUser = createAction('[User] Get current User');
export const requestCurrentUserSuccess = createAction('[User] Get current User Success', props<{ user: User }>());
export const requestCurrentUserFail = createAction('[User] Get current User Fail', props<{ error: string }>());

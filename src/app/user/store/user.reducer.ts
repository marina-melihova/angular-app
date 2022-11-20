import { Action, createReducer, on } from '@ngrx/store';
import { requestLogoutSuccess } from 'src/app/auth/store/auth.actions';
import * as userActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  isAdmin: boolean;
  name: string | null;
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: UserState = {
  isAdmin: false,
  name: null,
  isLoading: false,
  errorMessage: '',
};

export const reducer = createReducer(
  initialState,
  on(userActions.requestCurrentUser, (state) => ({ ...state, isLoading: true, errorMessage: '' })),
  on(userActions.requestCurrentUserSuccess, (state, { user }) => ({
    ...state,
    isAdmin: user.role === 'admin',
    name: user.name,
    isLoading: false,
  })),
  on(userActions.requestCurrentUserFail, (_, { error }) => ({ ...initialState, errorMessage: error })),
  on(requestLogoutSuccess, (_) => ({ ...initialState }))
);

export const userReducer = (state: UserState, action: Action): UserState => reducer(state, action);

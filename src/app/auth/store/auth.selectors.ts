import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const getToken = createSelector(getAuthState, (state) => state.token);
export const isUserAuthorized = createSelector(getAuthState, (state) => state.isAuthorized);
export const isLoading = createSelector(getAuthState, (state) => state.isLoading);
export const getSpecificErrorMessage = createSelector(getAuthState, (state) => state.errorMessage);

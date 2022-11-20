import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userFeatureKey } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getName = createSelector(getUserState, (state) => state.name);
export const isAdmin = createSelector(getUserState, (state) => state.isAdmin);
export const isLoading = createSelector(getUserState, (state) => state.isLoading);

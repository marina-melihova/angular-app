import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorsState, authorsFeatureKey } from './authors.reducer';

export const getAuthorsState = createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const getAuthors = createSelector(getAuthorsState, (state) => state.authors);
export const getAddedAuthors = createSelector(getAuthorsState, (state) => state.addedAuthors);
export const isLoading = createSelector(getAuthorsState, (state) => state.isLoading);

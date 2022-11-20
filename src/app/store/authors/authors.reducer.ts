import { Action, createReducer, on } from '@ngrx/store';
import * as authorsActions from './authors.actions';
import { Author } from 'src/app/models';

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[];
  addedAuthors: Author[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: AuthorsState = {
  authors: [],
  addedAuthors: [],
  isLoading: false,
  errorMessage: '',
};

export const reducer = createReducer(
  initialState,
  on(authorsActions.requestAuthors, (state) => ({ ...state, isLoading: true, errorMessage: '' })),
  on(authorsActions.requestAuthorsSuccess, (state, { authors }) => ({
    ...state,
    authors,
    isLoading: false,
  })),
  on(authorsActions.requestAuthorsFail, (state, { error }) => ({ ...state, isLoading: false, errorMessage: error })),
  on(authorsActions.requestAddAuthor, (state) => ({ ...state, isLoading: true, errorMessage: '' })),
  on(authorsActions.requestAddAuthorSuccess, (state, { author }) => ({
    ...state,
    authors: [...state.authors, author],
    addedAuthors: [...state.addedAuthors, author],
    isLoading: false,
  })),
  on(authorsActions.requestAddAuthorFail, (state, { error }) => ({ ...state, isLoading: false, errorMessage: error })),
  on(authorsActions.resetAddedAuthors, (state) => ({ ...state, addedAuthors: [] })),
  on(authorsActions.fillAddedAuthors, (state, { authors }) => ({ ...state, addedAuthors: authors }))
);

export const authorsReducer = (state: AuthorsState, action: Action): AuthorsState => reducer(state, action);

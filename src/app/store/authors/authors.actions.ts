import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/models';

export const requestAuthors = createAction('[Authors] Get Authors');
export const requestAuthorsSuccess = createAction('[Authors] Get Authors Success', props<{ authors: Author[] }>());
export const requestAuthorsFail = createAction('[Authors] Get Authors Fail', props<{ error: string }>());

export const requestAddAuthor = createAction('[Authors] Add Author', props<{ name: string }>());
export const requestAddAuthorSuccess = createAction('[Authors] Add Author Success', props<{ author: Author }>());
export const requestAddAuthorFail = createAction('[Authors] Add Author Fail', props<{ error: string }>());

export const resetAddedAuthors = createAction('[Authors] Reset added Authors');
export const fillAddedAuthors = createAction('[Authors] Fill added Authors', props<{ authors: Author[] }>());

import { ActionReducerMap } from '@ngrx/store';
import { authorsReducer, authorsFeatureKey } from './authors/authors.reducer';
import { coursesReducer, coursesFeatureKey } from './courses/courses.reducer';
import { AuthorsEffects } from './authors/authors.effects';
import { CoursesEffects } from './courses/courses.effects';

interface State {}

export const reducers: ActionReducerMap<State> = {
  [authorsFeatureKey]: authorsReducer,
  [coursesFeatureKey]: coursesReducer,
};

export const effects = [AuthorsEffects, CoursesEffects];

export * from './authors/authors.facade';
export * from './courses/courses.facade';

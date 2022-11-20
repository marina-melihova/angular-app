import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesFeatureKey } from './courses.reducer';

export const getCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const getAllCourses = createSelector(getCoursesState, (state) => state.allCourses);
export const getCourses = createSelector(getCoursesState, (state) => state.courses);
export const getCourse = createSelector(getCoursesState, (state) => state.course);
export const isAllCoursesLoadingSelector = createSelector(getCoursesState, (state) => state.isAllCoursesLoading);
export const isSingleCourseLoadingSelector = createSelector(getCoursesState, (state) => state.isSingleCourseLoading);
export const isSearchingStateSelector = createSelector(getCoursesState, (state) => state.isSearchState);
export const getErrorMessage = createSelector(getCoursesState, (state) => state.errorMessage);

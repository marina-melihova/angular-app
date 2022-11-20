import { Action, createReducer, on } from '@ngrx/store';
import * as coursesActions from './courses.actions';
import { Course } from 'src/app/models';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  courses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  courses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: '',
};

export const reducer = createReducer(
  initialState,
  on(coursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: '',
    isSearchState: false,
  })),
  on(coursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(coursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(coursesActions.requestCreateCourse, (state) => ({ ...state, isAllCoursesLoading: true, errorMessage: '' })),
  on(coursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    isAllCoursesLoading: false,
  })),
  on(coursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(coursesActions.requestEditCourse, (state) => ({ ...state, isAllCoursesLoading: true, errorMessage: '' })),
  on(coursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses.map((item) => (item.id === course.id ? course : item))],
    isAllCoursesLoading: false,
  })),
  on(coursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(coursesActions.requestDeleteCourse, (state) => ({ ...state, isAllCoursesLoading: true, errorMessage: '' })),
  on(coursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(coursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: '',
    isSearchState: true,
  })),
  on(coursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    isAllCoursesLoading: false,
  })),
  on(coursesActions.requestSingleCourse, (state) => ({ ...state, isSingleCourseLoading: true, errorMessage: '' })),
  on(coursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
  })),
  on(coursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  }))
);

export const coursesReducer = (state: CoursesState, action: Action): CoursesState => reducer(state, action);

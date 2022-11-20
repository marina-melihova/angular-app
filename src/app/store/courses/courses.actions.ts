import { createAction, props } from '@ngrx/store';
import { Course, CourseBody } from 'src/app/models';

export const requestAllCourses = createAction('[Courses] Get Courses');
export const requestAllCoursesSuccess = createAction('[Courses] Get Courses Success', props<{ courses: Course[] }>());
export const requestAllCoursesFail = createAction('[Courses] Get Courses Fail', props<{ error: string }>());

export const requestCreateCourse = createAction('[Courses] Add Course', props<{ body: CourseBody }>());
export const requestCreateCourseSuccess = createAction('[Courses] Add Course Success', props<{ course: Course }>());
export const requestCreateCourseFail = createAction('[Courses] Add Course Fail', props<{ error: string }>());

export const requestEditCourse = createAction('[Courses] Edit Course', props<{ id: string; body: CourseBody }>());
export const requestEditCourseSuccess = createAction('[Courses] Edit Course Success', props<{ course: Course }>());
export const requestEditCourseFail = createAction('[Courses] Edit Course Fail', props<{ error: string }>());

export const requestDeleteCourse = createAction('[Courses] Delete Course', props<{ id: string }>());
export const requestDeleteCourseFail = createAction('[Courses] Delete Course Fail', props<{ error: string }>());

export const requestSingleCourse = createAction('[Courses] Get single Course', props<{ id: string }>());
export const requestSingleCourseSuccess = createAction(
  '[Courses] Get single Course Success',
  props<{ course: Course }>()
);
export const requestSingleCourseFail = createAction('[Courses] Get single Course Fail', props<{ error: string }>());

export const requestFilteredCourses = createAction('[Courses] Get filtered Courses', props<{ searchValue: string }>());
export const requestFilteredCoursesSuccess = createAction(
  '[Courses] Get filtered Courses Success',
  props<{ courses: Course[] }>()
);

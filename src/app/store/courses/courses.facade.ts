import { CourseBody } from './../../models/course.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import * as coursesActions from './courses.actions';
import * as fromCourses from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  allCourses$ = this.store.select(fromCourses.getAllCourses);
  courses$ = this.store.select(fromCourses.getCourses);
  course$ = this.store.select(fromCourses.getCourse);
  isAllCoursesLoading$ = this.store.select(fromCourses.isAllCoursesLoadingSelector);
  isSingleCourseLoading$ = this.store.select(fromCourses.isSingleCourseLoadingSelector);

  isSearchingState$ = this.store.select(fromCourses.isSearchingStateSelector);
  errorMessage$ = this.store.select(fromCourses.getErrorMessage);

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(coursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(coursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(coursesActions.requestFilteredCourses({ searchValue }));
  }

  editCourse(id: string, body: CourseBody) {
    this.store.dispatch(coursesActions.requestEditCourse({ id, body }));
  }

  createCourse(body: CourseBody) {
    this.store.dispatch(coursesActions.requestCreateCourse({ body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(coursesActions.requestDeleteCourse({ id }));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { CoursesService } from '.';
import { Course, CoursesResponse, CourseResponse, CommonResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: CoursesResponse) => {
        this.courses$$.next(response.result);
      });
  }

  getCourse(id: string): Observable<CourseResponse> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(finalize(() => this.isLoading$$.next(false)));
  }

  createCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: CourseResponse) => {
        const courses = this.courses$$.getValue();
        this.courses$$.next([...courses, response.result]);
      });
  }

  editCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(course)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: CourseResponse) => {
        const editedCourse = response.result;
        const courses = this.courses$$.getValue();
        const newCourses = courses.map((item) => (course.id !== item.id ? item : editedCourse));
        this.courses$$.next(newCourses);
      });
  }

  deleteCourse(id: string): Observable<CommonResponse> {
    this.isLoading$$.next(true);
    return this.coursesService
      .deleteCourse(id)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .pipe(
        tap(() => {
          const courses = this.courses$$.getValue();
          const newCourses = courses.filter((item) => id !== item.id);
          this.courses$$.next(newCourses);
        })
      );
  }

  searchCourse(query: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: CoursesResponse) => {
        let courses = response.result;
        if (query.trim()) {
          courses = courses.filter((item: Course) => item.title.toLowerCase().includes(query.toLowerCase()));
        }
        this.courses$$.next(courses);
      });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, exhaustMap, catchError, BehaviorSubject, forkJoin, switchMap, filter, take, tap } from 'rxjs';
import * as coursesActions from './courses.actions';
import { AuthorsStateFacade, CoursesStateFacade } from '..';
import { CoursesService } from 'src/app/services';
import { Author, Course } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffects {
  private authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private addedAuthors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private allCourses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(
    private actions$: Actions,
    private authorsStateFacade: AuthorsStateFacade,
    private coursesStateFacade: CoursesStateFacade,
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.authorsStateFacade.authors$.subscribe(this.authors$);
    this.authorsStateFacade.addedAuthors$.subscribe(this.addedAuthors$);
    this.coursesStateFacade.allCourses$.subscribe(this.allCourses$);
  }

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestAllCourses),
      switchMap(() =>
        forkJoin([
          this.authorsStateFacade.isLoading$.pipe(
            filter((isLoading) => !isLoading),
            take(1)
          ),
          this.coursesService.getAll(),
        ])
      ),
      map(([_, response]) => {
        const allAuthors = this.authors$.getValue();
        const courses = response.result.map((item) => {
          item.authors = item.authors.map((authorId) => allAuthors.find(({ id }) => id === authorId)!.name);
          return item;
        });
        return coursesActions.requestAllCoursesSuccess({ courses });
      }),
      catchError((err) => of(coursesActions.requestAllCoursesFail({ error: err.toString() })))
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestSingleCourse),
      switchMap((action) =>
        forkJoin([
          this.authorsStateFacade.isLoading$.pipe(
            filter((isLoading) => !isLoading),
            take(1)
          ),
          this.coursesService.getCourse(action.id),
        ])
      ),
      map(([_, response]) => {
        const allAuthors = this.authors$.getValue();
        const course = response.result;
        const currentAuthors = <Author[]>course.authors.map((authorId) => allAuthors.find(({ id }) => id === authorId));
        this.authorsStateFacade.fillAddedAuthors(currentAuthors);
        course.authors = currentAuthors.map((author) => author.name);
        return coursesActions.requestSingleCourseSuccess({ course });
      }),
      catchError((err) => of(coursesActions.requestSingleCourseFail({ error: err.toString() })))
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestCreateCourse),
      exhaustMap((action) =>
        this.coursesService.createCourse(action.body).pipe(
          map((response) => {
            const course = response.result;
            const currentAuthors = this.addedAuthors$.getValue();
            course.authors = course.authors.map((authorId) => currentAuthors.find(({ id }) => id === authorId)!.name);
            return coursesActions.requestCreateCourseSuccess({ course });
          }),
          catchError((err) => of(coursesActions.requestCreateCourseFail({ error: err.toString() })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestEditCourse),
      exhaustMap((action) =>
        this.coursesService.editCourse(action.id, action.body).pipe(
          map((response) => {
            const course = response.result;
            const currentAuthors = this.addedAuthors$.getValue();
            course.authors = course.authors.map((authorId) => currentAuthors.find(({ id }) => id === authorId)!.name);
            return coursesActions.requestEditCourseSuccess({ course });
          }),
          catchError((err) => of(coursesActions.requestEditCourseFail({ error: err.toString() })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestDeleteCourse),
      exhaustMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => coursesActions.requestAllCourses()),
          catchError((err) => of(coursesActions.requestDeleteCourseFail({ error: err.toString() })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.requestFilteredCourses),
      map((action) => {
        const courses = this.allCourses$
          .getValue()
          .filter((item) => item.title.toLowerCase().includes(action.searchValue.toLowerCase()));
        return coursesActions.requestFilteredCoursesSuccess({ courses });
      })
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          coursesActions.requestCreateCourseSuccess,
          coursesActions.requestEditCourseSuccess,
          coursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['/courses']))
      ),
    { dispatch: false }
  );
}

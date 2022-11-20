import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, exhaustMap, catchError } from 'rxjs';
import * as authorsActions from './authors.actions';
import { AuthorsService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class AuthorsEffects {
  getAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorsActions.requestAuthors),
      exhaustMap(() =>
        this.authorsService.getAll().pipe(
          map((response) => authorsActions.requestAuthorsSuccess({ authors: response.result })),
          catchError((err) => of(authorsActions.requestAuthorsFail({ error: err.toString() })))
        )
      )
    )
  );

  addAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorsActions.requestAddAuthor),
      exhaustMap((action) =>
        this.authorsService.addAuthor(action.name).pipe(
          map((response) => authorsActions.requestAddAuthorSuccess({ author: response.result })),
          catchError((err) => of(authorsActions.requestAddAuthorFail({ error: err.toString() })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authorsService: AuthorsService) {}
}

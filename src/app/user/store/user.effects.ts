import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, mergeMap, catchError } from 'rxjs';
import * as userActions from './user.actions';
import { UserService } from '..';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.requestCurrentUser),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map((response) => userActions.requestCurrentUserSuccess({ user: response.result })),
          catchError((err) => of(userActions.requestCurrentUserFail({ error: err.toString() })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

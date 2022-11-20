import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModule } from '..';
import { UserState } from './user.reducer';
import { requestCurrentUser } from './user.actions';
import { getName, isAdmin, isLoading } from './user.selectors';

@Injectable({
  providedIn: UserModule,
})
export class UserStateFacade {
  name$ = this.store.select(getName);
  isAdmin$ = this.store.select(isAdmin);
  isLoading$ = this.store.select(isLoading);

  constructor(private store: Store<UserState>) {}

  getCurrentUser() {
    this.store.dispatch(requestCurrentUser());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthorsState } from './authors.reducer';
import * as authorsActions from './authors.actions';
import * as fromAuthors from './authors.selectors';
import { Author } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStateFacade {
  authors$ = this.store.select(fromAuthors.getAuthors);
  addedAuthors$ = this.store.select(fromAuthors.getAddedAuthors);
  isLoading$ = this.store.select(fromAuthors.isLoading);

  constructor(private store: Store<AuthorsState>) {}

  getAuthors() {
    this.store.dispatch(authorsActions.requestAuthors());
  }
  addAuthor(name: string) {
    this.store.dispatch(authorsActions.requestAddAuthor({ name }));
  }

  resetAddedAuthors() {
    this.store.dispatch(authorsActions.resetAddedAuthors());
  }

  fillAddedAuthors(authors: Author[]) {
    this.store.dispatch(authorsActions.fillAddedAuthors({ authors }));
  }
}

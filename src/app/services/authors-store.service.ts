import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, finalize, tap } from 'rxjs';
import { AuthorsService } from '.';
import { Author, AuthorResponse, AuthorsResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private authorService: AuthorsService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.authorService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: AuthorsResponse) => {
        this.authors$$.next(response.result);
      });
  }

  getAuthor(id: string): Observable<string> {
    this.isLoading$$.next(true);
    return this.authorService
      .getAuthor(id)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .pipe(map((response: AuthorResponse) => response.result.name));
  }

  addAuthor(name: string): Observable<AuthorResponse> {
    this.isLoading$$.next(true);
    return this.authorService
      .addAuthor(name)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .pipe(
        tap((response: AuthorResponse) => {
          const authors = this.authors$$.getValue();
          this.authors$$.next([...authors, response.result]);
        })
      );
  }
}

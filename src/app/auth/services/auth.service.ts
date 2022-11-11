import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { SessionStorageService } from '..';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public error$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {
    if (this.sessionStorage.getToken()) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: User) {
    this.isLoading$$.next(true);
    this.http
      .post('/login', user)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe({
        next: (res: any) => {
          this.sessionStorage.setToken(res.result);
          this.isAuthorized$$.next(true);
        },
        error: (err) => this.error$.next(err),
      });
  }

  logout() {
    this.http.delete('/logout');
    this.sessionStorage.deleteToken();
    this.isAuthorized$$.next(false);
  }

  register(user: User) {
    this.isLoading$$.next(true);
    return this.http
      .post('/register', user)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .pipe(
        catchError((err: any) => {
          this.error$.next(err);
          return err;
        })
      );
  }
}

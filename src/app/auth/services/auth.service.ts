import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { SessionStorageService, AuthModule } from '..';
import { User, LoginResponse, CommonResponse } from 'src/app/models';

@Injectable({
  providedIn: AuthModule,
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {
    if (this.sessionStorage.getToken()) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: User): Observable<LoginResponse> {
    this.isLoading$$.next(true);
    return this.http
      .post<LoginResponse>('/login', user)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .pipe(
        tap((response: LoginResponse) => {
          this.sessionStorage.setToken(response.result);
          this.isAuthorized$$.next(true);
        })
      );
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>('/logout', { observe: 'response' }).pipe(
      tap(() => {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
      })
    );
  }

  register(user: User): Observable<CommonResponse> {
    this.isLoading$$.next(true);
    return this.http.post<CommonResponse>('/register', user).pipe(finalize(() => this.isLoading$$.next(false)));
  }
}

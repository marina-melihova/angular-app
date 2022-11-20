import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Credentials, LoginResponse, CommonResponse } from 'src/app/models';
import { AuthModule } from '..';

@Injectable({
  providedIn: AuthModule,
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/login', credentials);
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>('/logout', {
      observe: 'response',
    });
  }

  register(user: User): Observable<CommonResponse> {
    return this.http.post<CommonResponse>('/register', user);
  }
}

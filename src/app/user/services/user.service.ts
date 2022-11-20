import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModule } from '..';
import { UserResponse } from 'src/app/models';

@Injectable({
  providedIn: UserModule,
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>('/users/me');
  }
}

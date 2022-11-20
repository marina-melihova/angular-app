import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorResponse, AuthorsResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AuthorsResponse> {
    return this.http.get<AuthorsResponse>('/authors/all');
  }

  getAuthor(id: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`/authors/${id}`);
  }

  addAuthor(name: string): Observable<AuthorResponse> {
    return this.http.post<AuthorResponse>('/authors/add', { name: name });
  }
}

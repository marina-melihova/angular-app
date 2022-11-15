import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CoursesResponse, CourseResponse, CommonResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>('/courses/all');
  }

  getCourse(id: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`/courses/${id}`);
  }

  createCourse(course: Course): Observable<CourseResponse> {
    return this.http.post<CourseResponse>('/courses/add', course);
  }

  editCourse(course: Course): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(`/courses/${course.id}`, course);
  }

  deleteCourse(id: string): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(`/courses/${id}`);
  }
}

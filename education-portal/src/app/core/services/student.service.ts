import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Student, WebinarWithStudents } from '../models/webinar.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://20.64.226.218:4200/api/students';

  constructor(private http: HttpClient) { }

  getStudentsByWebinar(webinarId: string): Observable<Student[]> {
    console.log('Fetching students for webinar:', webinarId, 'from:', `${this.apiUrl}/webinar/${webinarId}`);
    return this.http.get<WebinarWithStudents>(`${this.apiUrl}/webinar/${webinarId}`).pipe(
      tap(data => console.log('Students received:', data)),
      map(webinarWithStudents => webinarWithStudents.students || []),
      catchError(this.handleError)
    );
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    console.log('Creating student:', student, 'at:', this.apiUrl);
    return this.http.post<Student>(this.apiUrl, student).pipe(
      tap(data => console.log('Student created:', data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while fetching data';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

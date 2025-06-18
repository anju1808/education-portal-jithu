import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Webinar } from '../models/webinar.model';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private apiUrl = 'http://20.64.226.218:4200/api/webinars';

  constructor(private http: HttpClient) { }

  getAllWebinars(): Observable<Webinar[]> {
    console.log('Fetching webinars from:', this.apiUrl);
    return this.http.get<Webinar[]>(this.apiUrl).pipe(
      tap(data => console.log('Webinars received:', data)),
      catchError(this.handleError)
    );
  }

  getWebinarById(id: string): Observable<Webinar> {
    return this.http.get<Webinar>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createWebinar(webinar: Omit<Webinar, 'id'>): Observable<Webinar> {
    return this.http.post<Webinar>(this.apiUrl, webinar).pipe(
      catchError(this.handleError)
    );
  }

  getWebinarsByTutor(tutor: string): Observable<Webinar[]> {
    return this.http.get<Webinar[]>(`${this.apiUrl}/tutor/${tutor}`).pipe(
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/api/upload';
  constructor(private http: HttpClient) {}

  getPhoto = (filename: string) => {
    return this.http.get(this.apiUrl, { params: { filename } }).pipe(
      tap((e) => console.log(e)),
      catchError((error: HttpErrorResponse) => {
        console.log('ошибка getPhoto');

        console.error(error);
        return of('error', error);
      })
    );
  };

  savePhoto(file: any) {
    return this.http.post<any>(this.apiUrl, file);
  }
}

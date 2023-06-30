import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, of } from 'rxjs';
import { baseURL } from './API.router';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrlUpload = `${baseURL}/upload`;
  constructor(private http: HttpClient) {}

  getPhoto = (filename: string) => {
    return this.http.get(this.apiUrlUpload, { params: { filename } }).pipe(
      tap((e) => console.log(e)),
      catchError((error: HttpErrorResponse) => {
        console.log('ошибка getPhoto');

        console.error(error);
        return of('error', error);
      })
    );
  };

  savePhoto(file: any) {
    return this.http.post<any>(this.apiUrlUpload, file);
  }
}

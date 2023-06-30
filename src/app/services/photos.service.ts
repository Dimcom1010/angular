import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private httpClient: HttpClient) {}

  getAllCollections = () => {
    const URL: string = 'http://localhost:3000/api/photos';

    return this.httpClient.get(URL).pipe(
      tap((e) => console.log(e)),
      catchError((error: HttpErrorResponse) => {
        // Обработка ошибки
        console.error(error);
        return of('error', error);
      })
    );
  };
  getAllCollectionsPromise = () => {
    const URL: string = 'http://localhost:3000/api/photos';
    return firstValueFrom(this.httpClient.get(URL));
  };

  getCollection = (collectionName: any) => {
    const URL: string = 'http://localhost:3000/api/collection';
    return this.httpClient.get(URL, { params: { collectionName } });
  };

  getCollectionPromise = (collectionName: any) => {
    const URL: string = 'http://localhost:3000/api/collection';
    return firstValueFrom(
      this.httpClient.get(URL, { params: { collectionName } })
    );
  };
}

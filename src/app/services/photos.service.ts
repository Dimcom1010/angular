import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { baseURL } from './API.router';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrlPhotos = `${baseURL}/photos`;
  private apiUrlCollection = `${baseURL}/collection`;

  constructor(private httpClient: HttpClient) {}

  getAllCollections = () => {
    return this.httpClient.get(this.apiUrlPhotos).pipe(
      catchError((error: HttpErrorResponse) => {
        return of('error', error);
      })
    );
  };
  getAllCollectionsPromise = () => {
    return firstValueFrom(this.httpClient.get(this.apiUrlPhotos));
  };

  getCollection = (collectionName: any) => {
    return this.httpClient.get(this.apiUrlCollection, { params: { collectionName } });
  };

  getCollectionPromise = (collectionName: any) => {
    return firstValueFrom(
      this.httpClient.get(this.apiUrlCollection, { params: { collectionName } })
    );
  };
}

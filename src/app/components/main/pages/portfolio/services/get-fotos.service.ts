import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetFotosService {
  constructor(private httpClient: HttpClient) {}

  getFotos = () => {
    const res: any = [];
    const URL: string = 'http://jsonplaceholder.typicode.com/photos';
    return this.httpClient.get(URL).pipe(
      tap(e=>console.log(e)),
    );
  };
}

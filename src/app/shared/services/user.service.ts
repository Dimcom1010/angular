import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { FilterSearchAll, ResponseData, User } from '@shared/models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  public getCountUsers() {
    return this.http.get<number>(`${environment.serverUrl}user/count`);
  }

  public updateDataUser(user: User) {
    return firstValueFrom(this.http.put<User>(`${environment.serverUrl}user/update`, user));
  }

  public getUsers(req: FilterSearchAll): Observable<ResponseData<User>> {
    return this.http.post<ResponseData<User>>(`${environment.serverUrl}user`, req);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.serverUrl}user/${id}`);
  }
}

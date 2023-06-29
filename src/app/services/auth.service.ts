import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserName } from '../components/main/pages/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  IsAuth$ = new BehaviorSubject<boolean>(false);
  token$ = new BehaviorSubject<string>('');

  constructor(private readonly http: HttpClient) {}

  checkUser(name: string, password: string): Observable<boolean> {
    const user: User = { name, password };
    return this.http.post<boolean>(this.apiUrl, user);
  }
  checkUserName(name: string): Observable<boolean> {
    const user: UserName = { name };
    return this.http.post<boolean>(this.apiUrl, user);
  }

  login(): void {
    console.log('login');
    this.token$.next(this.tokenGen());
    localStorage.setItem('authToken', JSON.stringify(this.token$.value));
    this.IsAuth$.next(true);
  }
  logout(): void {
    console.log('logout');
    this.token$.next('');
    localStorage.setItem('authToken', JSON.stringify(this.token$.value));
    this.IsAuth$.next(false);
  }

  tokenGen(): string {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
    }
    return token;
  }
}

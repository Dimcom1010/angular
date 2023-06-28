import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  IsAuth$ = new BehaviorSubject<boolean>(false);
  token$ = new BehaviorSubject<string>('');
  login(): void {
    console.log('login');
    this.token$.next(this.tokenGen())
    localStorage.setItem('authToken',JSON.stringify(this.token$.value))
    this.IsAuth$.next(true);
  }
  logout(): void {
    console.log('logout');
    this.token$.next('')
    localStorage.setItem('authToken',JSON.stringify(this.token$.value))
    this.IsAuth$.next(false);
  }


  tokenGen():string{
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
    }
    return token;
  }

}

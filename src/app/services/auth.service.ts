import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { User as oldUser, UserName } from '../components/main/pages/models/User';
import { AuthRequest, AuthResponse, TokenSignRequest, TokenSignResponse, User } from '../shared/models/shared';
import { environment } from '@env';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly LS_TOKEN_NAME = 'access_token';
  public readonly user = signal<User | null>(null);
  public readonly accessToken = signal<string | null>(
    localStorage.getItem(this.LS_TOKEN_NAME) || null
  );

  /**/
  IsAuth$ = new BehaviorSubject<boolean>(false);
  token$ = new BehaviorSubject<string>('');
  /**/

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() {
    this.effects();
  }

  /** */
  checkUser(name: string, password: string): Observable<boolean> {
    const user: oldUser = { name, password };
    return this.http.post<boolean>(`${environment.serverUrl}api/login`, user);
  }
  checkUserName(name: string): Observable<boolean> {
    const user: UserName = { name };
    return this.http.post<boolean>(`${environment.serverUrl}api/login`, user);
  }

  login(): void {
    console.log('login');

    localStorage.setItem('authToken', JSON.stringify(this.token$.value));
    this.IsAuth$.next(true);
  }
  logout(): void {
    console.log('logout');
    this.token$.next('');
    localStorage.setItem('authToken', JSON.stringify(this.token$.value));
    this.IsAuth$.next(false);
  }

  /** */
  public get isAuth(): boolean {
    return !!this.user();
  }

  async signIn(request: AuthRequest): Promise<User> {
    try {
      const res = await firstValueFrom(this.http.post<AuthResponse>(`${environment.serverUrl}api/signin`, request));
      return await this.sign(res);
    } catch (error) {
      throw error;
    }
  }
 async signUp(request: AuthRequest) {
    try {
      const res = await firstValueFrom(this.http.post<AuthResponse>(`${environment.serverUrl}api/signup`, request));
      return await this.sign(res);
    } catch (error) {
      throw error;
    }
  }
  async tokenSignIn(request: TokenSignRequest): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<TokenSignResponse>(`${environment.serverUrl}api/tokenSignIn`, request),
    );
    this.sign(res, false);
  }

  logOut(navigate = true) {
    this.accessToken.set(null);
    this.user.set(null);
    navigate && this.router.navigate(['/login']);
  }


  private async sign(res: AuthResponse, redirect = true): Promise<User> {
    this.user.set(res.user);
    this.accessToken.set(res.access_token);
    redirect && this.router.navigate(['/']);
    return res.user;
  }

  private effects() {
    effect(() => {
      const token = this.accessToken();
      if (token) {
        localStorage.setItem(this.LS_TOKEN_NAME, token);
      } else {
        localStorage.removeItem(this.LS_TOKEN_NAME);
      }
    });
  }
}

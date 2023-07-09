import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthRequest, AuthResponse, TokenSignRequest, TokenSignResponse, User } from '@shared/models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** */ public readonly LS_TOKEN_NAME = 'access_token';

  /** */ public readonly user = signal<User | null>(null);
  /** */ public readonly accessToken = signal<string | null>(localStorage.getItem(this.LS_TOKEN_NAME) || null);

  /** */ private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /** */ constructor() {
    this.effects();
  }

  /** */ public get isAuth(): boolean {
    return !!this.user();
  }

  async signIn(request: AuthRequest): Promise<User> {
    try {
      const res = await firstValueFrom(this.http.post<AuthResponse>(`${environment.serverUrl}auth/signin`, request));
      return await this.sign(res);
    } catch (error) {
      throw error;
    }
  }

  async signUp(request: AuthRequest) {
    try {
      const res = await firstValueFrom(this.http.post<AuthResponse>(`${environment.serverUrl}auth/signup`, request));
      return await this.sign(res);
    } catch (error) {
      throw error;
    }
  }

  async tokenSignIn(request: TokenSignRequest): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<TokenSignResponse>(`${environment.serverUrl}auth/tokenSignIn`, request),
    );
    this.sign(res, false);
  }

  logout(navigate = true) {
    this.accessToken.set(null);
    this.user.set(null);
    navigate && this.router.navigate(['/auth']);
  }

  private async sign(res: AuthResponse, redirect = true): Promise<User> {
    this.user.set(res.user);
    this.accessToken.set(res.access_token);
    redirect && this.router.navigate(['/']);
    return res.user;
  }

  /** */ private effects() {
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

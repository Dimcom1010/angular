import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAdmin$ = new BehaviorSubject<boolean>(false);
  login(): void {
    this.isAdmin$.next(true);
  }
  logout(): void {
    this.isAdmin$.next(false);
  }
  public isAdmin = () => this.isAdmin$.value;
}

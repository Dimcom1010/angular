import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router,RouterStateSnapshot,UrlSegment,UrlTree} from '@angular/router';
import { Observable, first, map, of } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private readonly _router:Router) { }
  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):
     Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.getIsAuth()
  }

  canLoad(
    router:Router,
    segments:UrlSegment[]):Observable<boolean > | Promise<boolean> | boolean {
    return this.getIsAuth()
  }

  private getIsAuth() : Observable<boolean>{
    return this.authService.IsAuth$.pipe(
      first(),
      map((isAuth)=>{
        if (!isAuth){
          //redirect
          console.log('ПОЛЬЗОВАТЕЛЬ НЕ ЗАРЕГИСТРИРОВАН!!')
          this._router.navigateByUrl('/login')
        }
        return isAuth;
      })
    )
  }

}

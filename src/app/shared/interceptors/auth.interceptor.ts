import { HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, throwError } from 'rxjs';

import { AuthService } from '@shared/services';

export function AuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const token = authService.accessToken();
  if (token) {
    request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(request).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          authService.logout();
        }
        if (err.status === 426) {
          // tokenexpires
          const token = err.error.access_token;
          authService.accessToken.set(token);
          return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(delay(500));
        }
      }
      return throwError(() => err);
    }),
  );
}

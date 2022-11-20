import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionStorageService, AuthStateFacade } from '..';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    public authStateFacade: AuthStateFacade,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.sessionStorageService.getToken() || '';
    request = request.clone({
      url: 'http://localhost:4000' + request.url,
      setHeaders: {
        Authorization: token,
      },
    });
    return next.handle(request).pipe(
      catchError((err: any) => {
        let msg: string;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            this.authStateFacade.closeSession();
            this.router.navigate(['/login']);
            msg = err.statusText;
          }
          if (err.status === 400) {
            msg = err.error?.result || err.error?.errors.join('; ');
          }
        }
        return throwError(() => new Error(msg || err.message));
      })
    );
  }
}

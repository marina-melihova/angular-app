import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService, AuthModule } from '..';

@Injectable({
  providedIn: AuthModule,
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$.pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }
}

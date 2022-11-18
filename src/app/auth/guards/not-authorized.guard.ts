import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService, AuthModule } from '..';

@Injectable({
  providedIn: AuthModule,
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthorized$.pipe(
      map((isAuth) => {
        if (!isAuth) {
          return true;
        } else {
          this.router.createUrlTree(['courses']);
          return false;
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthStateFacade, AuthModule } from '..';

@Injectable({
  providedIn: AuthModule,
})
@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private authStateFacade: AuthStateFacade, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authStateFacade.isAuthorized$.pipe(
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

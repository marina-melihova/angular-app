import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, skipWhile } from 'rxjs';
import { UserModule, UserStoreService } from '..';

@Injectable({
  providedIn: UserModule,
})
export class AdminGuard implements CanActivate {
  isAdmin: boolean;
  constructor(private userStoreService: UserStoreService, private router: Router) {
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStoreService.isLoading$.pipe(
      skipWhile((isLoading) => isLoading),
      map(() => {
        if (this.isAdmin) {
          return true;
        } else {
          return this.router.createUrlTree(['courses']);
        }
      })
    );
  }
}

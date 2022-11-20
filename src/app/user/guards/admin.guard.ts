import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject, map, filter } from 'rxjs';
import { UserModule, UserStoreService } from '..';

@Injectable({
  providedIn: UserModule,
})
export class AdminGuard implements CanActivate {
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private userStoreService: UserStoreService, private router: Router) {
    this.userStoreService.getUser();
    this.userStoreService.isAdmin$.subscribe(this.isAdmin$$);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userStoreService.isLoading$.pipe(
      filter((isLoading) => !isLoading),
      map(() => {
        const isAdmin = this.isAdmin$$.getValue();
        if (isAdmin) {
          return true;
        } else {
          return this.router.createUrlTree(['courses']);
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject, map, filter } from 'rxjs';
import { UserModule, UserStateFacade } from '..';

@Injectable({
  providedIn: UserModule,
})
export class AdminGuard implements CanActivate {
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private userStateFacade: UserStateFacade, private router: Router) {
    this.userStateFacade.getCurrentUser();
    this.userStateFacade.isAdmin$.subscribe(this.isAdmin$$);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userStateFacade.isLoading$.pipe(
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

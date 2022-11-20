import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { UserModule, UserService } from '..';
import { UserResponse } from 'src/app/models';

@Injectable({
  providedIn: UserModule,
})
export class UserStoreService {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
  public name$: Observable<string> = this.name$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.isLoading$$.next(true);
    this.userService
      .getUser()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((response: UserResponse) => {
        this.name$$.next(response.result.name);
        this.isAdmin$$.next(response.result.role === 'admin');
      });
  }
}

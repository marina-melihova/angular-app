import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, takeUntil, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth';
import { UserStoreService } from 'src/app/user';
import { CoursesStoreService, AuthorsStoreService } from 'src/app/services';
import { areSomeValueTrue } from 'src/app/shared/utils';

@Component({
  selector: 'app-courses',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss'],
})
export class CoursesContainerComponent implements OnDestroy {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;
  private destroyStream = new Subject<void>();

  constructor(
    public authService: AuthService,
    public userStoreService: UserStoreService,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private authorsStoreService: AuthorsStoreService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initLoadingState();
    this.userStoreService.getUser();
    this.authorsStoreService.getAll();
    this.coursesStoreService.getAll();
  }

  ngAfterViewChecked() {
    let isLoading = this.isLoading$$.getValue();
    if (isLoading != this.isLoading) {
      this.isLoading = isLoading;
      this.cdRef.detectChanges();
    }
  }

  logout() {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroyStream))
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.router.navigate(['/login']);
        }
      });
  }

  initLoadingState() {
    combineLatest([
      this.userStoreService.isLoading$,
      this.authorsStoreService.isLoading$,
      this.coursesStoreService.isLoading$,
    ])
      .pipe(takeUntil(this.destroyStream))
      .subscribe((loaders) => {
        this.isLoading$$.next(areSomeValueTrue(loaders));
      });
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, BehaviorSubject, takeUntil, combineLatest } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth';
import { UserStateFacade } from 'src/app/user';
import { AuthorsStateFacade, CoursesStateFacade } from 'src/app/store';
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
    public authStateFacade: AuthStateFacade,
    public userStateFacade: UserStateFacade,
    public coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initLoadingState();
    this.userStateFacade.getCurrentUser();
    this.authorsStateFacade.getAuthors();
    this.coursesStateFacade.getAllCourses();
  }

  ngAfterViewChecked() {
    let isLoading = this.isLoading$$.getValue();
    if (isLoading != this.isLoading) {
      this.isLoading = isLoading;
      this.cdRef.detectChanges();
    }
  }

  logout() {
    this.authStateFacade.logout();
  }

  initLoadingState() {
    combineLatest([
      this.userStateFacade.isLoading$,
      this.authorsStateFacade.isLoading$,
      this.coursesStateFacade.isAllCoursesLoading$,
      this.coursesStateFacade.isSingleCourseLoading$,
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

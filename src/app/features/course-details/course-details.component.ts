import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, BehaviorSubject, filter } from 'rxjs';
import { CoursesStoreService, AuthorsStoreService } from 'src/app/services';
import { Course, Author, CourseResponse } from 'src/app/models';

@Component({
  selector: 'app-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course: Course | null = null;
  courseId: string;
  authorsNames: string[] = [];

  private destroyStream = new Subject<void>();
  private authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorsStoreService: AuthorsStoreService,
    private coursesStoreService: CoursesStoreService
  ) {
    this.authorsStoreService.authors$.subscribe(this.authors$);
    this.authorsStoreService.isLoading$.subscribe(this.isLoading$);
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.initCourseData();
  }

  initCourseData() {
    this.coursesStoreService
      .getCourse(this.courseId)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: (response: CourseResponse) => {
          this.course = response.result;
          const courseAuthorsIds = this.course.authors;
          this.isLoading$.pipe(filter((isLoading) => !isLoading)).subscribe(() => {
            const allAuthors = this.authors$.getValue();
            this.authorsNames = courseAuthorsIds.map((authorId) => allAuthors.find(({ id }) => id === authorId)!.name);
          });
        },
        error: () => this.router.navigateByUrl('404', { skipLocationChange: true }),
      });
  }

  goBack() {
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CoursesStateFacade } from 'src/app/store';
import { Course } from 'src/app/models';

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

  constructor(private route: ActivatedRoute, private router: Router, private coursesStateFacade: CoursesStateFacade) {
    this.coursesStateFacade.course$.subscribe((course) => (this.course = course));
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.coursesStateFacade.getSingleCourse(this.courseId);
  }

  goBack() {
    this.router.navigate(['courses']);
  }

  ngOnDestroy() {
    this.destroyStream.next();
  }
}

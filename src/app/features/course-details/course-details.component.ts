import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { mockedCourseList } from '../courses/mocks';

@Component({
  selector: 'app-course',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    const course = mockedCourseList.find((item) => item.id === courseId);
    if (course) {
      this.course = course;
    } else {
      this.router.navigateByUrl('404', { skipLocationChange: true });
    }
  }

  goBack() {
    this.router.navigate(['courses']);
  }
}

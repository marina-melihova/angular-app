import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateFacade } from 'src/app/user';
import { CoursesStateFacade } from 'src/app/store';
import { Course } from 'src/app/models';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  showDeleteModal = false;
  courseDelId: string;
  infoTitle = 'You can also add new course';
  infoText = 'Please, use the "Add new course" button';
  addBtnText = 'Add new course';
  btnWidth = '235px';
  courses: Course[] = [];

  private isSearchingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public coursesStateFacade: CoursesStateFacade,
    public userStateFacade: UserStateFacade,
    private router: Router
  ) {
    this.coursesStateFacade.isSearchingState$.subscribe(this.isSearchingState$);
    this.coursesStateFacade.courses$.subscribe((items) => {
      if (this.isSearchingState$.getValue()) {
        this.courses = items;
      }
    });
    this.coursesStateFacade.allCourses$.subscribe((items) => {
      if (!this.isSearchingState$.getValue()) {
        this.courses = items;
      }
    });
  }

  onAddCourse() {
    this.router.navigate(['courses/add']);
  }

  onEdit(courseId: string) {
    this.router.navigate(['/courses/edit', courseId]);
  }

  onShow(courseId: string) {
    this.router.navigate(['/courses', courseId]);
  }

  onSearch(query: string) {
    this.coursesStateFacade.getFilteredCourses(query);
  }

  onDelete(courseId: string) {
    this.courseDelId = courseId;
    this.showDeleteModal = true;
  }

  onConfirmDeleteModal(isOk: boolean) {
    if (isOk) {
      this.coursesStateFacade.deleteCourse(this.courseDelId);
    }
    this.showDeleteModal = false;
  }

  onToggle() {
    this.showDeleteModal = !this.showDeleteModal;
  }
}

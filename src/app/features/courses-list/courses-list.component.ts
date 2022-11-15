import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CoursesStoreService } from 'src/app/services';
import { UserStoreService } from 'src/app/user';
import { Course } from 'src/app/models';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  isLoading: boolean = false;
  showDeleteModal = false;
  courseDelId: string;
  infoTitle = 'You can also add new course';
  infoText = 'Please, use the "Add new course" button';
  addBtnText = 'Add new course';
  btnWidth = '235px';
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(
    public coursesStoreService: CoursesStoreService,
    public userStoreService: UserStoreService,
    private router: Router
  ) {
    coursesStoreService.courses$.subscribe(this.courses$$);
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
    this.coursesStoreService.searchCourse(query);
  }

  onDelete(courseId: string) {
    this.courseDelId = courseId;
    this.showDeleteModal = true;
  }

  onConfirmDeleteModal(isOk: boolean) {
    if (isOk) {
      this.coursesStoreService.deleteCourse(this.courseDelId).subscribe(() => {
        const coursesList = this.courses$$.getValue();
        if (!coursesList.length) {
          this.coursesStoreService.getAll();
        }
      });
    }
    this.showDeleteModal = false;
  }

  onToggle() {
    this.showDeleteModal = !this.showDeleteModal;
  }
}

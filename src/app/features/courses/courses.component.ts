import { Component } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { mockedCourseList } from './mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  isAdmin = true;

  courses: Course[] = mockedCourseList;

  infoTitle = 'You can also add new course';
  infoText = 'Please, use the "Add new course" button';
  infoBtnText = 'Add new course';
  btnWidth = '235px';

  showModal = false;

  deleteCourse(course: Course) {
    const newList = this.courses.filter((item) => item.id != course.id);
    this.courses = newList;
  }

  editCourse(course: Course) {
    console.log('Edit course: ', course.title);
  }

  getCourse(course: Course) {
    console.log('Details of course: ', course.title);
  }

  onAddCourse() {
    console.log('Add course');
  }

  onToggle() {
    this.showModal = !this.showModal;
  }

  handleChoose(isOk: boolean) {
    const choose = isOk ? 'OK' : 'Close';
    console.log('Pressed ', choose);
    this.showModal = false;
  }
}

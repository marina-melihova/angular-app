import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  title = 'course-card';
  showBtnText = 'Show course';
  btnWidth = '180px';
  editIcon: IconName = 'pencil';
  deleteIcon: IconName = 'trash-can';

  @Input() course: Course;
  @Input() isEditable: boolean = false;

  @Output() delete = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() show = new EventEmitter<Course>();

  showItem(item: Course) {
    this.show.emit(item);
  }

  deleteItem(item: Course) {
    this.delete.emit(item);
  }

  editItem(item: Course) {
    this.edit.emit(item);
  }
}

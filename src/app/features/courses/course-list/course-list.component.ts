import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses?: Course[];
  @Input() isEditable: boolean = false;

  @Output() delete = new EventEmitter<Course>();
  @Output() edit = new EventEmitter<Course>();
  @Output() show = new EventEmitter<Course>();

  showBtnText = 'Show course';
  btnWidth = '180px';
  editIcon: IconName = 'pencil';
  deleteIcon: IconName = 'trash-can';

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

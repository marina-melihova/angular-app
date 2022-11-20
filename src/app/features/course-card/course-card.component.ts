import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import { Course, Author } from 'src/app/models';

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

  constructor() {}

  @Input() course: Course;
  @Input() isEditable: boolean | null = false;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() show = new EventEmitter<string>();

  showItem(courseId: string) {
    this.show.emit(courseId);
  }

  deleteItem(courseId: string) {
    this.delete.emit(courseId);
  }

  editItem(courseId: string) {
    this.edit.emit(courseId);
  }
}

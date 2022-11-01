import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses?: Course[];
  @Input() isEditable: boolean = false;

  @Output() deleteCard = new EventEmitter<Course>();
  @Output() editCard = new EventEmitter<Course>();
  @Output() showCard = new EventEmitter<Course>();

  onShowCard(item: Course) {
    this.showCard.emit(item);
  }

  onDeleteCard(item: Course) {
    this.deleteCard.emit(item);
  }

  onEditCard(item: Course) {
    this.editCard.emit(item);
  }
}

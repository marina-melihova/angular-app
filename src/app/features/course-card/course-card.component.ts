import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { AuthorsStoreService } from 'src/app/services';
import { Course, Author } from 'src/app/models';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  title = 'course-card';
  showBtnText = 'Show course';
  btnWidth = '180px';
  editIcon: IconName = 'pencil';
  deleteIcon: IconName = 'trash-can';
  authorsNames: string[] = [];

  private authors$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authorsStoreService: AuthorsStoreService) {
    this.authorsStoreService.authors$.subscribe(this.authors$);
    this.authorsStoreService.isLoading$.subscribe(this.isLoading$);
  }

  @Input() course: Course;
  @Input() isEditable: boolean | null = false;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() show = new EventEmitter<string>();

  ngOnInit() {
    this.isLoading$.pipe(filter((isLoading) => !isLoading)).subscribe(() => {
      const allAuthors = this.authors$.getValue();
      this.authorsNames = this.course.authors.map((authorId) => allAuthors.find(({ id }) => id === authorId)!.name);
    });
  }

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

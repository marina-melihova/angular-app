import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  title = 'course-card';

  @Input() course: Course;

  numToString(num: number) {
    return num < 10 ? String('0' + num) : String(num);
  }

  convertTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    const label = hours > 1 || hours === 0 ? 'hours' : 'hour';
    return `${this.numToString(hours)}:${this.numToString(min)} ${label}`;
  }

  displayDate(date: string) {
    const dateParts = date.split('/') as unknown as number[];
    const day = this.numToString(dateParts[0]);
    const month = this.numToString(dateParts[1]);
    const year = dateParts[2];
    return `${day}.${month}.${year}`;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesListContainerComponent } from './courses-list-container.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';

@NgModule({
  declarations: [
    CoursesListContainerComponent,
    CourseCardComponent,
    CoursesListComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [CoursesListContainerComponent, SharedModule],
})
export class CoursesListContainerModule {}

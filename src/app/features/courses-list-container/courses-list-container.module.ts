import { CourseDetailsComponent } from './../course-details/course-details.component';
import { CourseFormComponent } from './../course-form/course-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CoursesListContainerComponent } from './courses-list-container.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListContainerComponent,
  },
  {
    path: 'form',
    component: CourseFormComponent,
  },
  {
    path: ':id',
    component: CourseDetailsComponent,
  },
];

const COMPONENTS = [
  CoursesListContainerComponent,
  CourseCardComponent,
  CoursesListComponent,
  CourseFormComponent,
  CourseDetailsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [SharedModule],
})
export class CoursesListContainerModule {}

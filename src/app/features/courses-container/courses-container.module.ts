import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { UserModule } from 'src/app/user';
import {
  CoursesContainerComponent,
  CoursesListComponent,
  CourseCardComponent,
  CourseDetailsComponent,
  CourseFormComponent,
} from '..';

const COMPONENTS = [
  CoursesContainerComponent,
  CourseCardComponent,
  CoursesListComponent,
  CourseFormComponent,
  CourseDetailsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule, ReactiveFormsModule, CoursesRoutingModule, UserModule],
  exports: [RouterModule],
})
export class CoursesContainerModule {}

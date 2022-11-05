import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CourseFormComponent } from './course-form.component';

@NgModule({
  declarations: [CourseFormComponent],
  imports: [ReactiveFormsModule, SharedModule, RouterModule],
  exports: [CourseFormComponent],
})
export class CourseFormModule {}

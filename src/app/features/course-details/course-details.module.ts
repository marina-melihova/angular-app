import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseDetailsComponent } from './course-details.component';

@NgModule({
  declarations: [CourseDetailsComponent],
  imports: [CommonModule, SharedModule],
})
export class CourseModule {}

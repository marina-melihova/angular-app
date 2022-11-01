import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseComponent } from './course.component';

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, SharedModule],
})
export class CourseModule {}

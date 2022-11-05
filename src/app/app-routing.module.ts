import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components';
import { CoursesListContainerComponent } from './features/courses-list-container/courses-list-container.component';
import { CourseDetailsComponent } from './features/course-details/course-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesListContainerComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  { path: '**', title: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

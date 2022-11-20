import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesContainerComponent, CoursesListComponent, CourseDetailsComponent, CourseFormComponent } from '..';
import { AdminGuard } from 'src/app/user';

const routes: Routes = [
  {
    path: '',
    component: CoursesContainerComponent,
    children: [
      {
        path: 'add',
        component: CourseFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'edit/:id',
        component: CourseFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: ':id',
        component: CourseDetailsComponent,
      },
      {
        path: '',
        component: CoursesListComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

import { CourseFormComponent } from './features/course-form/course-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components';
import { CoursesListContainerComponent } from './features/courses-list-container/courses-list-container.component';
import { CourseDetailsComponent } from './features/course-details/course-details.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'courses',
    component: CoursesListContainerComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'form',
    component: CourseFormComponent,
  },
  { path: '**', title: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

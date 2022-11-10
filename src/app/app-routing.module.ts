import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import(
        './features/courses-list-container/courses-list-container.module'
      ).then((mod) => mod.CoursesListContainerModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', title: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

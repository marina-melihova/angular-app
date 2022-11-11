import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components';
import { AuthorizedGuard, NotAuthorizedGuard } from './auth';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses-container/courses-container.module').then((mod) => mod.CoursesContainerModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then((mod) => mod.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.module').then((mod) => mod.RegistrationModule),
    canActivate: [NotAuthorizedGuard],
  },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', title: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

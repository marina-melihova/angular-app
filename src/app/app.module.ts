import { LoginComponent } from './features/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  CoursesModule,
  CourseModule,
  LoginModule,
  RegistrationModule,
} from './features';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoursesModule,
    CourseModule,
    LoginModule,
    RegistrationModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  CoursesModule,
  CourseModule,
  LoginModule,
  RegistrationModule,
} from './features';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesModule,
    CourseModule,
    LoginModule,
    RegistrationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

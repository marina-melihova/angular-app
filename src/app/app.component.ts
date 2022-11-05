import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-angular-app';
  isAuthorized = true;

  onSignOut() {
    this.isAuthorized = false;
  }
}

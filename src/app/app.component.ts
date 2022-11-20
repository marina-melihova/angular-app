import { Component } from '@angular/core';
import { AuthStateFacade } from 'src/app/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-angular-app';
  constructor(private authStateFacade: AuthStateFacade) {
    this.authStateFacade.setAuthorization();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  userName: string = 'Harry Potter';
  btnText: string = 'Logout';
  btnWidth: string = '140px';

  @Output() signOut = new EventEmitter();

  onLogout() {
    this.signOut.emit();
  }
}

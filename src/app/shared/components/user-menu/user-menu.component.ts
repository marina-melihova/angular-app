import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  btnText: string = 'Logout';
  btnWidth: string = '140px';

  @Input() name: string | null;

  @Output() signOut = new EventEmitter();

  onLogout() {
    this.signOut.emit();
  }
}

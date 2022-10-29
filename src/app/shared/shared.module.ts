import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faPencil,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
} from './components';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FontAwesomeModule],
  exports: [...COMPONENTS],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPencil, faTrashCan, faXmark);
  }
}

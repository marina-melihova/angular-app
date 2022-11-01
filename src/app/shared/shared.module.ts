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
import { ConvertTimePipe, DisplayDatePipe } from './pipes';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
];

const PIPES = [ConvertTimePipe, DisplayDatePipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, FontAwesomeModule],
  exports: [...COMPONENTS, ...PIPES],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPencil, faTrashCan, faXmark);
  }
}

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
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
  NotFoundComponent,
} from './components';
import { ConvertTimePipe, DisplayDatePipe } from './pipes';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
  NotFoundComponent,
];

const PIPES = [ConvertTimePipe, DisplayDatePipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, NotFoundComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [...COMPONENTS, ...PIPES],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPencil, faTrashCan, faXmark, faArrowLeft);
  }
}

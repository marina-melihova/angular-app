import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faPencil,
  faTrashCan,
  faXmark,
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
  NotFoundComponent,
  SearchBarComponent,
} from './components';
import { DurationPipe, CreationDatePipe } from './pipes';
import { EmailValidatorDirective, ToggleTypeDirective } from './directives';

const COMPONENTS = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  UserMenuComponent,
  NotFoundComponent,
  SearchBarComponent,
];

const PIPES = [DurationPipe, CreationDatePipe];

const DIRECTIVES = [EmailValidatorDirective, ToggleTypeDirective];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [...COMPONENTS, ...PIPES, ...DIRECTIVES, CommonModule],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPencil,
      faTrashCan,
      faXmark,
      faArrowLeft,
      faEye,
      faEyeSlash
    );
  }
}

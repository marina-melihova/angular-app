import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggleType]',
  exportAs: 'inputType',
})
export class ToggleTypeDirective {
  isShown: boolean = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.isShown = !this.isShown;
    if (this.isShown) {
      this.el.nativeElement.setAttribute('type', 'text');
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
    }
  }

  getIcon() {
    return this.isShown ? 'eye' : 'eye-slash';
  }
}

import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResizeInput]',
})
export class ResizeInputDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const countSymbols = this.el.nativeElement.value.length;
    this.el.nativeElement.style.width = countSymbols + 'ch';
  }
}

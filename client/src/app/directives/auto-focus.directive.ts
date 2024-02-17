import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterContentInit {
  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 500);
  }
}

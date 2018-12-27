import { Input, Directive, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { 
  }

  @Input() appHighlight: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#99ccff');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

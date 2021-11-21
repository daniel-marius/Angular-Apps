// In our case, we will be using the attribute directive to highlight the searchText in the result list.

import {
  Directive,
  Input,
  SimpleChanges,
  Renderer2,
  ElementRef,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() searchedWord: string; // searchText
  @Input() content: string; // HTML content
  @Input() classToApply: string; // class to apply highlighting
  @Input() setTitle: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.searchedWord = '';
    this.content = '';
    this.classToApply = '';
    this.setTitle = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(this.el.nativeElement, 'title', this.content);
    }

    if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        this.content
      );
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return this.content.replace(re, `<span class="${this.classToApply}">`);
  }
}

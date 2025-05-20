import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-hover-icon-button',
  imports: [NgIcon],
  templateUrl: './hover-icon-button.component.html',
  styleUrl: './hover-icon-button.component.css',
})
export class HoverIconButtonComponent {
  @Input() iconDefault: string = '';
  @Input() iconHover: string = '';
  @Input() cssClass: string = '';
  @Output() clicked = new EventEmitter<void>();

  isHovering: boolean = false;

  handleClick() {
    this.clicked.emit();
  }
}

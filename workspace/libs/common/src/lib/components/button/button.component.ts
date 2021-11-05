import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'buildmotion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() iconClass = '';
  @Output() clicked = new EventEmitter();

  btnClicked(event: Event) {
    event.stopPropagation();
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

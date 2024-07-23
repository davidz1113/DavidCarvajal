import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../../core/constanst/button.enums';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() textButton: string = 'default text';
  @Input() isDisabled: boolean = false;
  @Input() type: ButtonType = ButtonType.Primary;
  @Output() onClickAction: EventEmitter<any> = new EventEmitter<any>();
}

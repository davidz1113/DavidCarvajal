import { Component, inject, Input } from '@angular/core';


@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible: boolean | null = false;
 
}

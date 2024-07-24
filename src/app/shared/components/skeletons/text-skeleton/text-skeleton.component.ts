import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-text-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './text-skeleton.component.html',
  styleUrl: './text-skeleton.component.scss',
})
export class TextSkeletonComponent {
  @Input() height: string = '30';
  @Input() width: string = '60';
}

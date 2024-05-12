import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-wrapper',
  standalone: true,
  template: ` <div>
    <ng-content></ng-content>
  </div>`,
  styleUrl: './text-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWrapperComponent {}

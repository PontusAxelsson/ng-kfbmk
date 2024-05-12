import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-newspaper',
  standalone: true,
  templateUrl: '.../../../../assets/icons/newspaper.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperComponent {}

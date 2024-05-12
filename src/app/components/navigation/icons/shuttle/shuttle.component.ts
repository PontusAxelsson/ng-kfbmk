import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shuttle',
  standalone: true,
  templateUrl: '../../../../../assets/icons/shuttle.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShuttleComponent {}

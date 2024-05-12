import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-map-location',
  standalone: true,
  templateUrl: '../../../../../assets/icons/map-location.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLocationComponent {}

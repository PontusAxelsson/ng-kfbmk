import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TextWrapperComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {}

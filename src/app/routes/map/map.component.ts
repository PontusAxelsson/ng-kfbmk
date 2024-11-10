import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TextWrapperComponent, GoogleMap, MapMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 55.7827633, lng: 13.0913239 };
  zoom = 12;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
}

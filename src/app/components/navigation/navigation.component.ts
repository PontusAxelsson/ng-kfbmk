import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewspaperComponent } from './icons/newspaper/newspaper.component';
import { ShuttleComponent } from './icons/shuttle/shuttle.component';
import { MapLocationComponent } from './icons/map-location/map-location.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterModule,
    NewspaperComponent,
    ShuttleComponent,
    MapLocationComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {}

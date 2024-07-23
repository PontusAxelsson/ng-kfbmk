import { Routes, RouterConfigOptions } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  {
    path: 'info',
    loadChildren: () =>
      import('./routes/info/info.routes').then((m) => m.routes),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./routes/news/news.routes').then((m) => m.routes),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./routes/map/map.component').then((m) => m.MapComponent),
  },
];

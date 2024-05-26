import { Routes, RouterConfigOptions } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  {
    path: 'info',
    loadComponent: () =>
      import('./routes/info/info.component').then((m) => m.InfoComponent),
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./routes/news/news.component').then((m) => m.NewsComponent),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./routes/map/map.component').then((m) => m.MapComponent),
  },
];

import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'edit/:uuid',
    component: EditComponent,
  },
];

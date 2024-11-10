import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:uuid',
    component: EditComponent,
  },
];

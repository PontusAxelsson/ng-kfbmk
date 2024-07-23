import { Routes} from '@angular/router';
import { InfoComponent } from './info.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: InfoComponent
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

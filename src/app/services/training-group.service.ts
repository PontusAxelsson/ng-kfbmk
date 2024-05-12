import { Injectable } from '@angular/core';
import { TrainingGroup } from '../store/traning-groups.store';

@Injectable({
  providedIn: 'root',
})
export class TrainingGroupService {
  loadAll(): Promise<TrainingGroup[]> {
    console.log('Loading all training groups...');
    return Promise.resolve([
      {
        name: 'Group 1',
        info: 'Info 1',
        training: 'Training 1',
      },
      {
        name: 'Group 2',
        info: 'Info 2',
        training: 'Training 2',
      },
    ]);
  }
  constructor() {}
}

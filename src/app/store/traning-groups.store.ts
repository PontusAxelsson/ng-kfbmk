import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TrainingGroupService } from '../services/training-group.service';

export interface TrainingGroup {
  name: string;
  info: string;
  training: string;
}

interface TrainingGroupState {
  trainingGroups: TrainingGroup[];
  isLoading: boolean;
  isLoaded: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

const initialState: TrainingGroupState = {
  trainingGroups: [],
  isLoading: false,
  isLoaded: false,
  filter: { query: '', order: 'asc' },
};

export const TrainingGroupStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, booksService = inject(TrainingGroupService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const trainingGroups = await booksService.loadAll();
      patchState(store, { trainingGroups, isLoading: false, isLoaded: true });
    },
  })),
);

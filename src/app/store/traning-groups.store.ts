import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TrainingGroupService } from '../services/training-group.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export interface TrainingGroup {
  id: string;
  name: string;
  info: string;
  training: string;
  age_start: number;
  age_end: number;
  cost: number;
}

interface TrainingGroupState {
  trainingGroups: TrainingGroup[];
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: TrainingGroupState = {
  trainingGroups: [],
  isLoading: false,
  isLoaded: false,
};

export const TrainingGroupStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, trainingGroupService = inject(TrainingGroupService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    loadAll: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => trainingGroupService.subscribeAll()),
        tap((trainingGroups) =>
          patchState(store, {
            isLoading: false,
            isLoaded: true,
            trainingGroups,
          }),
        ),
      ),
    ),
  })),
);

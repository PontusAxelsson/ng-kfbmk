import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, tap } from 'rxjs';

export interface Role {
  name: string;
  add: boolean;
  comment: boolean;
  delete: boolean;
  update: boolean;
}

interface RolesState {
  role?: Role;
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: RolesState = {
  isLoading: false,
  isLoaded: false,
};

export const RolesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, RolesService = inject(RolesService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    load: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
      ),
    ),
  })),
);

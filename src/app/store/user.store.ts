import { User } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserService } from '../services/user.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

interface UserState {
  Users: User | null;
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: UserState = {
  Users: null,
  isLoading: false,
  isLoaded: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, UserService = inject(UserService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    loadAll: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => UserService.subscribeAll()),
        tap((Users) =>
          patchState(store, {
            isLoading: false,
            isLoaded: true,
            Users,
          }),
        ),
      ),
    ),
  })),
);

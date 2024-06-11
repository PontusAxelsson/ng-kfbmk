import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { UserService, UserData as User } from '../services/user.service';
import { distinctUntilChanged, of, pipe, switchMap, tap } from 'rxjs';

interface UserState {
  user: User | undefined;
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  isLoaded: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    load: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => userService.user()),
        switchMap((user) =>
          user?.uid ? userService.subscribeUserData(user?.uid) : of(),
        ),
        tap((user) =>
          patchState(store, {
            isLoading: false,
            isLoaded: true,
            user,
          }),
        ),
      ),
    ),
  })),
);

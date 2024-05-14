import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NewsService } from '../services/news.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export interface News {
  id: string;
  title: string;
  text: string;
}

interface NewsState {
  news: News[];
  isLoading: boolean;
  isLoaded: boolean;
  limiter: number;
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  isLoaded: false,
  limiter: 4,
};

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, newsService = inject(NewsService)) => ({
    loadAll: rxMethod<number>(
      pipe(
        distinctUntilChanged(),
        tap((limiter) => patchState(store, { isLoading: true, limiter })),
        switchMap((limiter) => newsService.subscribeAll(limiter)),
        tap((news) =>
          patchState(store, {
            isLoading: false,
            isLoaded: true,
            news,
          }),
        ),
      ),
    ),
  })),
);

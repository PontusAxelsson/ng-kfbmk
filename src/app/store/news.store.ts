import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NewsService } from '../services/news.service';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export interface News {
  uuid: string;
  title: string;
  text: string;
  created: { seconds: number; nanoseconds: number };
  createdBy: string;
}

interface NewsState {
  news: News[];
  entities: Map<string, News>;
  isLoading: boolean;
  isLoaded: boolean;
  limiter: number;
}

const initialState: NewsState = {
  news: [],
  entities: new Map(),
  isLoading: false,
  isLoaded: false,
  limiter: 4,
};

export const NewsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    news: computed(() => [...store.entities().values()]),
  })),
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
            entities: new Map(news.map((news) => [news.uuid, news])),
          }),
        ),
      ),
    ),
    loadById: rxMethod<string>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => newsService.getById(id)),
        tap((news) => {
          console.log(news);

          return patchState(store, {
            isLoading: false,
            entities: store.entities().set(news.uuid, news),
          });
        }),
      ),
    ),
  })),
);

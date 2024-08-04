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
  docName: string;
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
  limiter: number;
}

const initialState: NewsState = {
  news: [],
  entities: new Map(),
  isLoading: false,
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
        tap((news) =>
          patchState(store, {
            isLoading: false,
            entities: new Map(store.entities().set(news.uuid, news)),
          }),
        ),
      ),
    ),
    update: rxMethod<{
      docName: string;
      news: { uuid: string; content: string; title: string };
    }>(
      pipe(
        tap(({ news }) =>
          patchState(store, {
            entities: new Map(
              store.entities().set(news.uuid, {
                ...(store.entities().get(news.uuid) as News),
              }),
            ),
          }),
        ),
        tap(({ news, docName }) =>
          newsService.update(docName, {
            text: news.content,
            title: news.title,
          }),
        ),
      ),
    ),
  })),
);

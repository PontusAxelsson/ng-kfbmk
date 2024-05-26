import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCXzWsx9NUl0ZjuG7KOxbjr5myXH7IEMl8',
        authDomain: 'kfbmk-344618.firebaseapp.com',
        projectId: 'kfbmk-344618',
        storageBucket: 'kfbmk-344618.appspot.com',
        messagingSenderId: '495139186632',
        appId: '1:495139186632:web:de4c7a3bf0b4a715c9c2fd',
        measurementId: 'G-1GYZ28X74Y',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

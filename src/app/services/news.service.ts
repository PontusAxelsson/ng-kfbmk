import { Injectable, inject } from '@angular/core';
import { News } from '../store/news.store';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
  getDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  readonly firestore = inject(Firestore);
  readonly dbPath: string = 'news';

  subscribeAll(limiter: number = 5) {
    const docRef: CollectionReference<DocumentData, DocumentData> = collection(
      this.firestore,
      this.dbPath,
    );

    const queryRef = query(docRef, limit(limiter), orderBy('created', 'desc'));
    return new Observable<News[]>((observer) => {
      return onSnapshot(
        queryRef,
        (snapshot) => {
          return observer.next(snapshot.docs.map((doc) => doc.data() as News));
        },
        (error) => observer.error(error.message),
      );
    });
  }

  getById(uid: string) {
    const queryRef = doc(this.firestore, this.dbPath, uid);
    return new Observable<News>((observer) => {
      return onSnapshot(
        queryRef,
        () =>
          getDoc(queryRef).then((doc) => {
            console.log(doc.exists());

            return observer.next(doc.data() as News);
          }),
        (error) => observer.error(error.message),
      );
    });
  }
}

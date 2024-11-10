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
  updateDoc,
  doc,
  where,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  readonly firestore = inject(Firestore);
  readonly dbPath: string = 'news';

  readonly docRef: CollectionReference<DocumentData, DocumentData> = collection(
    this.firestore,
    this.dbPath,
  );

  subscribeAll(limiter: number = 5) {
    const queryRef = query(
      this.docRef,
      limit(limiter),
      orderBy('created', 'desc'),
    );
    return new Observable<News[]>((observer) => {
      return onSnapshot(
        queryRef,
        (snapshot) => {
          return observer.next(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                docName: snapshot.docs[0].id,
              } as News;
            }),
          );
        },
        (error) => observer.error(error.message),
      );
    });
  }

  getById(uid: string) {
    const queryRef = query(this.docRef, where('uuid', '==', uid), limit(1));
    return new Observable<News>((observer) => {
      return onSnapshot(
        queryRef,
        (snapshot) => {
          const doc = snapshot.docs[0].data() as News;
          const news: News = { ...doc, docName: snapshot.docs[0].id };
          return observer.next(news);
        },
        (error) => observer.error(error.message),
      );
    });
  }

  add(data: { text: string; title: string }, user: User | null | undefined) {
    if (!user) {
      throw new Error('User is not authenticated');
    }
    const id = uuid();
    const newsItem = {
      ...data,
      uuid: id,
      created_by: user?.uid,
      created: new Date(),
    };

    addDoc(this.docRef, newsItem);

    return { ...data, id };
  }

  update(docName: string, data: { text: string; title: string }) {
    const newsRef = doc(this.firestore, this.dbPath, docName);
    updateDoc(newsRef, data);
  }
}

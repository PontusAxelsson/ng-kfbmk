import { Injectable, inject } from '@angular/core';
import { TrainingGroup } from '../store/traning-groups.store';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  query,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingGroupService {
  readonly firestore = inject(Firestore);
  readonly dbPath: string = 'trainingGroups';

  subscribeAll() {
    const docRef: CollectionReference<DocumentData, DocumentData> = collection(
      this.firestore,
      this.dbPath,
    );
    const queryRef = query(docRef);
    return new Observable<TrainingGroup[]>((observer) => {
      return onSnapshot(
        queryRef,
        (snapshot) =>
          observer.next(
            snapshot.docs.map((doc) => doc.data() as TrainingGroup),
          ),
        (error) => observer.error(error.message),
      );
    });
  }
}

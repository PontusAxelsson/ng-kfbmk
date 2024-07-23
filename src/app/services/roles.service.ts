import { Injectable, inject } from '@angular/core';
import { Role } from '../store/Roles.store';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  readonly firestore = inject(Firestore);
  readonly dbPath: string = 'Roles';

  subscribeAll() {
    const docRef: CollectionReference<DocumentData, DocumentData> = collection(
      this.firestore,
      this.dbPath,
    );

    const queryRef = query(docRef);
    return new Observable<Role[]>((observer) => {
      return onSnapshot(
        queryRef,
        (snapshot) => {
          return observer.next(snapshot.docs.map((doc) => doc.data() as Role));
        },
        (error) => observer.error(error.message),
      );
    });
  }
}

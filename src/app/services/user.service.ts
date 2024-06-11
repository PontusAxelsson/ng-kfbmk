import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';

export interface UserData {
  name: string;
  authProvider: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  private async signInGooglePromise() {
    console.log('signing in with google');

    const { user } = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const refUserDoc = doc(this.firestore, 'users', user.uid);
    const { data, exists } = await getDoc(refUserDoc);
    if (!exists) {
      return await setDoc(refUserDoc, {
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        role: 'user',
      });
    }
    return data;
  }

  user() {
    return user(this.auth);
  }

  subscribeUserData(uid: string) {
    const queryRef = doc(this.firestore, 'users', uid);
    return new Observable<UserData>((observer) => {
      return onSnapshot(
        queryRef,
        () =>
          getDoc(queryRef).then((doc) => observer.next(doc.data() as UserData)),
        (error) => observer.error(error.message),
      );
    });
  }

  signInGoogle() {
    return from(this.signInGooglePromise());
  }

  signOut() {
    this.auth.signOut();
  }

  signInEmail({ email, password }: { email: string; password: string }) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}

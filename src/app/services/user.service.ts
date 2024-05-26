import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';

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

  signInGoogle() {
    return from(this.signInGooglePromise());
  }

  signOut() {
    // this.auth.signOut();
  }

  signInEmail({ email, password }: { email: string; password: string }) {
    // return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}

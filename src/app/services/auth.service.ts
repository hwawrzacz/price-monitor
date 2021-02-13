import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { default as firebase } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _fireAuth: AngularFireAuth) { }

  public singInWithPopup(): void {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    this._fireAuth.signInWithPopup(authProvider)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

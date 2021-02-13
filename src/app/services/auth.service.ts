import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { default as firebase } from 'firebase';
import { RouterPath } from '../model/enums/router-path';
import { StorageKey } from '../model/enums/storage-key';
import { User } from '../model/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authProvider = new firebase.auth.GoogleAuthProvider();
  private _user: User;

  get user(): User {
    return this._user;
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  constructor(
    private _fireAuth: AngularFireAuth,
    private _navController: NavController,
    private _storageService: StorageService,
  ) { }

  public singInWithGoogle(): void {
    console.log('logging in with google');

    this._fireAuth.signInWithPopup(this._authProvider)
      .then(credentials => this.handleLoginSuccess(credentials))
      .catch(err => this.handleLoginError(err))
  }

  private handleLoginSuccess(credentials: firebase.auth.UserCredential): void {
    this._user = credentials.user;
    this._storageService.put(StorageKey.USER, credentials);
    this._navController.navigateRoot(RouterPath.HOME);
  }

  private handleLoginError(err: any): void {
    console.error(err);
  }
}

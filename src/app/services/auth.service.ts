import { Injectable, NgZone } from '@angular/core';
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
    private _zone: NgZone,
  ) {
    this._fireAuth.onAuthStateChanged(res => this.checkIfUserIsLoggedIn(res));
  }

  private checkIfUserIsLoggedIn(res: any) {
    !!res ? this.handleSignInSuccess(res) : this.handleSignInError(res, true);
  }

  public singInWithGoogle(): void {
    this._fireAuth.signInWithPopup(this._authProvider)
      .then(credentials => this.handleSignInSuccess(credentials.user))
      .catch(err => this.handleSignInError(err));
  }

  public signOut(): void {
    this._fireAuth.signOut()
      .then(() => this.handleSignOutSuccess())
      .catch(err => this.handleSignOutError(err));
  }

  //#region Response handlers
  private handleSignInSuccess(user: User): void {
    this._user = user;
    this._storageService.put(StorageKey.USER, this._user);
    this.navigate(RouterPath.HOME);
  }

  private handleSignInError(err: any, autoLogin = false): void {
    autoLogin ? {} : console.error(err);
  }

  private handleSignOutSuccess(): void {
    this.navigate(RouterPath.LOGIN);
  }

  private handleSignOutError(err: any): void {
    console.error(err);
  }
  //#endregion

  private navigate(path: RouterPath): void {
    this._zone.run(() => {
      this._navController.navigateRoot(path);
    })
  }
}

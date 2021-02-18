import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Device } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { default as Firebase } from 'firebase';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginType } from '../model/enums/login-type';
import { RouterPath } from '../model/enums/router-path';
import { StorageKey } from '../model/enums/storage-key';
import { createDeviceIdBasedUser, createProfileBasedUser, User } from '../model/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authProvider = new Firebase.auth.GoogleAuthProvider();
  private _user: User;
  private _isChecking: boolean;

  get user(): User {
    return this._user;
  }

  get isProfileBasedUser(): boolean {
    return this.user.loginType === LoginType.PROFILE;
  }

  get isChecking(): boolean {
    return this._isChecking;
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  constructor(
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _navController: NavController,
    private _storageService: StorageService,
    private _zone: NgZone,
  ) {
    this._isChecking = true;
    this.checkForSavedDeviceId();
  }

  //#region Auto login
  /** Checks for saved device id. If getting device id was successful, 
   * then check if such id exists in database. If device wasn't received, 
   * then proceeds with standard login checks.*/
  private async checkForSavedDeviceId(): Promise<void> {
    const deviceId = (await Device.getInfo()).uuid;

    !!deviceId
      ? this.checkDeviceIdRemotely(deviceId)
      : this.checkIfUserIsLoggedIn();
  }

  /** Checks if deviceID exists in database. If so, login login was 
   * successful, else proceeds with standard login checks.*/
  private checkDeviceIdRemotely(deviceId: string): void {
    this._firestore.collection('devices').doc(deviceId).get()
      .pipe(
        tap(res => {
          res.exists
            // device id found - login success
            ? this.handleDeviceSignInSuccess(deviceId)
            // device id not found - try standard login
            : this.checkIfUserIsLoggedIn();
        }),
        catchError(err => of(this.handleSignInError(err)))
      )
      .subscribe();
  }

  private checkIfUserIsLoggedIn() {
    this._fireAuth.onAuthStateChanged(res => !!res
      ? this.handleProfileSignInSuccess(res)
      : this.handleSignInError(res, true)
    );
  }
  //#endregion

  public async signInWithDeviceId(): Promise<void> {
    const deviceId = (await Device.getInfo()).uuid;

    !!deviceId
      ? this.handleDeviceSignInSuccess(deviceId)
      : this.handleSignInError(`Couldn't receive device id`);
  }

  public singInWithGoogle(): void {
    this._fireAuth.signInWithPopup(this._authProvider)
      .then(credentials => this.handleProfileSignInSuccess(credentials.user))
      .catch(err => this.handleSignInError(err));
  }

  public signOut(): void {
    this._fireAuth.signOut()
      .then(() => this.handleSignOutSuccess())
      .catch(err => this.handleSignOutError(err));
  }

  //#region Sign in success handlers
  private handleDeviceSignInSuccess(deviceId: string): void {
    console.log('singed in with device');

    const user = createDeviceIdBasedUser(deviceId);
    this.handleSignInSuccess(user);
  }

  private handleProfileSignInSuccess(fbUser: Firebase.User): void {
    console.log('singed in with profile');

    const user = createProfileBasedUser(fbUser);
    this.handleSignInSuccess(user);
  }

  private handleSignInSuccess(user: User): void {
    this._user = user;
    this._storageService.put(StorageKey.USER, this._user);
    this.navigate(RouterPath.HOME);
    this._isChecking = false;
  }
  //#endregion

  //#region Response handlers
  private handleSignInError(err: any, autoLogin = false): void {
    autoLogin ? {} : console.error(err);
    this._isChecking = false;
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

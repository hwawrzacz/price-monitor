import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Currency } from '../model/enums/currency';
import { Language } from '../model/enums/language';
import { ProfileSettings } from '../model/profile-settings';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private readonly DEFAULT_SETTINGS = {
    language: Language.PL,
    currency: Currency.PLN,
    shareGrobally: false,
    fetchGlobally: false,
  } as ProfileSettings;

  public profileSettings$: BehaviorSubject<ProfileSettings>;

  constructor(private _firestore: AngularFirestore, private _authService: AuthService) {
    this.profileSettings$ = new BehaviorSubject<ProfileSettings>(this.DEFAULT_SETTINGS);
  }

  //#region Loading data
  public loadUserData(): void {
    this._firestore.collection(`profiles`).doc(this._authService.user.uid).valueChanges()
      .pipe(
        tap((settings: ProfileSettings) => this.handleUserSettingsReceived(settings))
      )
      .subscribe()
  }
  //#endregion

  private handleUserSettingsReceived(settings: ProfileSettings): void {
    if (!!settings) {
      // Load saved settings
      this.profileSettings$.next(settings);
    } else {
      // Load default settigns
      this.updateProfileSettings(this.DEFAULT_SETTINGS)
    }
  }

  //#region Saving data
  public updateProfileSettings(newSettings: ProfileSettings): void {
    this.profileSettings$.next(newSettings);
    this.updateSettingsRemotely(newSettings)
  }

  private updateSettingsRemotely(value: ProfileSettings): void {
    this._firestore.collection(`profiles`).doc(this._authService.user.uid).set(value)
  }
  //#endregion
}

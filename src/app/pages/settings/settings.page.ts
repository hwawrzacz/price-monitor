import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ProfileSettings } from 'src/app/model/profile-settings';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  private _form: FormGroup;
  private _settings: ProfileSettings;
  private _destroyed: Subject<void>;
  dupa = true;

  get form(): FormGroup {
    return this._form;
  }

  get settings(): ProfileSettings {
    return this._settings;
  }

  get photoURL(): string {
    return this._authService.user.photoURL;
  }

  get displayName(): string {
    return this._authService.user.displayName;
  }

  get email(): string {
    return this._authService.user.email;
  }

  constructor(
    private _modalController: ModalController,
    private _authService: AuthService,
    private _settingsService: ProfileSettingsService,
    private _formBuilder: FormBuilder,
  ) {
    this._settings = {} as ProfileSettings;
    this._destroyed = new Subject();
    this._form = this.buildForm();
  }

  ngOnInit() {
    this.observeProfileSettingsChanges();
    this.observeFormControlsChanges();
  }

  private observeProfileSettingsChanges(): void {
    this._settingsService.profileSettings$.pipe(
      tap(settings => this.updateForm(settings))
    ).subscribe()
  }

  //#region Form operations
  private buildForm(): FormGroup {
    return this._formBuilder.group({
      fetchGlobally: [true, [Validators.required]],
      shareGlobally: [true, [Validators.required]],
      language: [null, [Validators.required]],
      currency: [null, [Validators.required]],
    });
  }

  private updateForm(settings: ProfileSettings): void {
    // Temporarily update settings
    this._settings.fetchGlobally = settings.fetchGlobally;
    this._settings.shareGlobally = settings.shareGlobally;
    this._settings.language = settings.language;
    this._settings.currency = settings.currency;

    this._form.patchValue({
      fetchGlobally: settings.fetchGlobally,
      shareGlobally: settings.shareGlobally,
      language: settings.language,
      currency: settings.currency,
    });
  }

  private parseForm(): ProfileSettings {
    return {
      fetchGlobally: this._form.get('fetchGlobally').value,
      shareGlobally: this._form.get('shareGlobally').value,
      language: this._form.get('language').value,
      currency: this._form.get('currency').value,
    } as ProfileSettings;
  }

  private observeFormControlsChanges(): void {
    const controlNames = Object.keys(this.form.controls);
    controlNames.forEach(controlName => {
      this._form.get(controlName).valueChanges
        .pipe(
          takeUntil(this._destroyed),
          tap(() => this.updateSettings)
        )
        .subscribe();
    });
  }

  //#region Ugly AF updates. Description below.
  /** Let me explain why this shit is here. 
   * For some reason, ionic couldn't be nice and allow me to use reactive forms, 
   * or even ngModel. It just didn't responded for any changes, like all binding 
   * were disabled. I'm very disgusted, and upset, that I was forced to do this 
   * in the ugly way.
   */
  public updateFetchGlobally(event: any): void {
    const newValue = !!event.target.checked;
    console.log(newValue);
    this._settings.fetchGlobally = newValue;
    this._form.get('fetchGlobally').patchValue(newValue);
    this.updateSettings();
  }

  public updateShareGlobally(event: any): void {
    const newValue = !!event.target.checked;
    console.log(newValue);
    this._settings.shareGlobally = newValue;
    this._form.get('shareGlobally').patchValue(newValue);
    this.updateSettings();
  }

  public updateLanguage(event: any): void {
    const newValue = event.target.value;
    console.log(newValue);
    this._settings.language = newValue;
    this._form.get('language').patchValue(newValue);
    this.updateSettings();
  }

  public updateCurrency(event: any): void {
    const newValue = event.target.value;
    console.log(newValue);
    this._settings.currency = newValue;
    this._form.get('currency').patchValue(newValue);
    this.updateSettings();
  }

  private updateSettings(): any {
    const newSettings = this.parseForm();
    console.log(newSettings);
    this._settingsService.updateProfileSettings(newSettings);
  }
  //#endregion

  public signOut(): void {
    this.onClose();
    this._authService.signOut();
  }

  public onClose(): void {
    this._modalController.dismiss()
  }

  public ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

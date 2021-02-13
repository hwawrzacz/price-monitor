import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

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
  ) { }

  ngOnInit() {
  }

  public signOut(): void {
    this.onClose();
    this._authService.signOut();
  }

  public onClose(): void {
    this._modalController.dismiss()
  }

}

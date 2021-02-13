import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';
import { PriceInsertionComponent } from '../price-insertion/price-insertion.component';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private _settingsService: ProfileSettingsService,
    private _modalController: ModalController,
  ) { }

  public ngOnInit(): void {
    this._settingsService.loadUserData();
  }

  //#region Modals  
  public onOpenSettingsDialog(): void {
    this.openSettingsDialog().catch(err => console.error(err));
  }

  private async openSettingsDialog(): Promise<void> {
    const settingsModal = await this._modalController.create({
      component: SettingsPage,
      mode: 'ios',
      swipeToClose: true,
    });
    return settingsModal.present();
  }

  public onOpenPriceInsertionPopover(): void {
    this.openPriceInsertionPopover().catch(err => console.error(err));
  }

  private async openPriceInsertionPopover(): Promise<void> {
    const priceInsertionPopover = await this._modalController.create({
      component: PriceInsertionComponent,
      cssClass: 'modal--bottom',
      mode: 'ios',
      swipeToClose: true,
    });
    return priceInsertionPopover.present();

  }
  //#endregion
}
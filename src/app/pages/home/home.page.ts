import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PriceInsertionComponent } from '../price-insertion/price-insertion.component';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private _testCollection$: Observable<any>;

  constructor(
    private _firestore: AngularFirestore,
    private _modalController: ModalController,
  ) { }

  public ngOnInit(): void {
  }

  //#region Modals  
  public onOpenSettingsDialog(): void {
    this.openSettingsDialog()
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
    this.openPriceInsertionPopover()
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
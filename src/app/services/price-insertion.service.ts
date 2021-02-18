import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../model/product';
import { AuthService } from './auth.service';
import { ProfileSettingsService } from './profile-settings.service';

@Injectable({
  providedIn: 'root'
})
export class PriceInsertionService {

  constructor(private _firestore: AngularFirestore, private _settings: ProfileSettingsService, private _authService: AuthService) { }

  public async insertProduct(product: Product): Promise<DocumentReference<DocumentData>> {
    const shareGlobally = this._settings.profileSettings$.value.shareGlobally;
    if (shareGlobally) {
      return this.insertProductGlobally(product);
    } else {
      return this.insertProductForUser(product);
    }
  }

  private async insertProductGlobally(product: Product): Promise<DocumentReference<DocumentData>> {
    const productCollectionName = product.name.toLowerCase().replace(/ /g, '');
    return this._firestore.collection(`products_global/common/${productCollectionName}`).add(product);
  }

  private async insertProductForUser(product: Product): Promise<DocumentReference<DocumentData>> {
    const userId = this._authService.user.uid;
    const profileBased = this._authService.isProfileBasedUser;
    const productCollectionName = product.name.toLowerCase().replace(/ /g, '');

    if (profileBased) {
      return this._firestore.collection(`products_profile/${userId}/${productCollectionName}`).add(product);
    } else {
      return this._firestore.collection(`products_device/${userId}/${productCollectionName}`).add(product);
    }
  }
}

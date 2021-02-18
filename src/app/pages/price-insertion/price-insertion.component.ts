import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Currency } from 'src/app/model/enums/currency';
import { getUnitsStringList, Unit } from 'src/app/model/enums/unit';
import { Product, ProductPrice } from 'src/app/model/product';
import { PriceInsertionService } from 'src/app/services/price-insertion.service';
import { ProfileSettingsService } from 'src/app/services/profile-settings.service';

@Component({
  selector: 'app-price-insertion',
  templateUrl: './price-insertion.component.html',
  styleUrls: ['./price-insertion.component.scss'],
})
export class PriceInsertionComponent implements OnInit {
  private initialName;
  private _form: FormGroup;

  get form(): FormGroup {
    return this._form
  }

  get units(): string[] {
    return getUnitsStringList();
  }

  get domesticCurrency(): Currency {
    return this._settings.profileSettings$.value.currency;
  }

  constructor(
    private _modalController: ModalController,
    private _formBuilder: FormBuilder,
    private _settings: ProfileSettingsService,
    private _priceInsertionService: PriceInsertionService,
  ) { }

  ngOnInit() {
    this._form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      name: [this.initialName, [Validators.required]],
      price: [null, [Validators.required]],
      unit: [Unit.PCS, [Validators.required]],
      isBargain: [false, [Validators.required]]
    })
  }

  private parseFromForm(): Product {
    return {
      name: this._form.get('name').value,
      price: { [this.domesticCurrency]: this._form.get('price').value } as ProductPrice,
      unit: this._form.get('unit').value,
      isBargain: this._form.get('isBargain').value,
      domesticCurrency: this.domesticCurrency,
      date: new Date(Date.now()).toUTCString(),
    } as Product;
  }

  public onInsert(): void {
    const product = this.parseFromForm();
    this._priceInsertionService.insertProduct(product)
      .then(() => console.log('Item added'))
      .catch(console.error)
  }

  public onClose(): void {
    this._modalController.dismiss();
  }
}

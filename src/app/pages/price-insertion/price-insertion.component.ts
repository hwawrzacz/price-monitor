import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Currency } from 'src/app/model/enums/currency';
import { getUnitsStringList, Unit } from 'src/app/model/enums/unit';
import { Product, ProductPrice } from 'src/app/model/product';
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
    private _settings: ProfileSettingsService
  ) { }

  ngOnInit() {
    this._form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this._formBuilder.group({
      name: [this.initialName, [Validators.required]],
      price: [null, [Validators.required]],
      unit: [Unit.PCS, [Validators.required]],
      isBargain: [null, [Validators.required]]
    })
  }

  private parseFromForm(): Product {
    return {
      name: this._form.get('name').value,
      price: { [this.domesticCurrency]: this._form.get('price').value } as ProductPrice,
      unit: this._form.get('unit').value,
      domesticCurrency: this.domesticCurrency,
      isBargain: false,
      date: new Date(Date.now()),
    } as Product;
  }

  public onInsert(): void {
    const price = this.parseFromForm();
    console.log(price);
  }

  public onClose(): void {
    this._modalController.dismiss();
  }
}

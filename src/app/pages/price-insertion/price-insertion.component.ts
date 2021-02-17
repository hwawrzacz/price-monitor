import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-price-insertion',
  templateUrl: './price-insertion.component.html',
  styleUrls: ['./price-insertion.component.scss'],
})
export class PriceInsertionComponent implements OnInit {

  constructor(private _modalController: ModalController) { }

  ngOnInit() { }

  public onClose(): void {
    this._modalController.dismiss();
  }

}

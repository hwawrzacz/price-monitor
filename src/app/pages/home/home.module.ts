import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';
import { PriceInsertionComponent } from '../price-insertion/price-insertion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,

    // Components
    ProductCardComponent,
    ProductsListComponent,
    PriceInsertionComponent
  ]
})
export class HomePageModule { }

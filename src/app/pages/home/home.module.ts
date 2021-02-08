import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,

    // Components
    ProductCardComponent,
    ProductsListComponent,]
})
export class HomePageModule { }

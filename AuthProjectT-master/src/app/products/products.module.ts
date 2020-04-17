import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomModule} from '../shared/modules/custom/custom.module';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    CustomModule
  ]
})
export class ProductsModule {
}

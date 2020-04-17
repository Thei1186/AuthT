import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductsComponent} from './products.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {CreateProductComponent} from './create-product/create-product.component';


const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'update/:id', component: UpdateProductComponent},
  {path: 'create', component: CreateProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}

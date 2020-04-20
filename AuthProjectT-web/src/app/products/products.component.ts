import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from './shared/product';
import {ProductService} from './shared/product.service';
import {Select, Store} from '@ngxs/store';
import {ProductState} from './shared/product.state';
import {DeleteProduct, GetAllProducts} from './shared/product.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Select(ProductState.availableProducts) products$: Observable<Product[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts());
  }

  deleteProduct(uid: string) {
    this.store.dispatch(new DeleteProduct(uid));
  }
}

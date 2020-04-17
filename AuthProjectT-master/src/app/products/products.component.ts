import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from './shared/product';
import {ProductService} from './shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;
  constructor(private pService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.pService.getProducts();
  }

  deleteProduct(uid: string) {
    console.log(uid);
    this.pService.deleteProduct(uid);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '../shared/product';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetProduct, UpdateProduct} from '../shared/product.action';
import {Observable} from 'rxjs';
import {ProductState} from '../shared/product.state';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  id: string;
  @Select(ProductState.chosenProduct) chosenProduct: Observable<Product>;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private store: Store) {
    this.productForm = this.formBuilder.group({
      name: '',
      price: 0,
      stock: 0
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetProduct(this.id));
    this.chosenProduct.subscribe(product => {
      if (!product) {
        return;
      }
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        stock: product.stock
      });
    });
  }

  onSubmit() {
    const productFromForm = this.productForm.value;
    const product: Product = {
      uId: this.id,
      name: productFromForm.name,
      stock: productFromForm.stock,
      price: productFromForm.price
    };
    this.store.dispatch(new UpdateProduct(product));
  }
}

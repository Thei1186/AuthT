import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';
import {Store} from "@ngxs/store";
import {CreateProduct} from "../shared/product.action";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private pService: ProductService,
              private store: Store) {
    this.productForm = this.formBuilder.group({
      name: '',
      price: 0,
      stock: 0
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const productFromForm = this.productForm.value;
    const product = {
      name: productFromForm.name,
      stock: productFromForm.stock,
      price: productFromForm.price
    };
    this.store.dispatch(new CreateProduct(product as Product));
    // this.pService.createProduct(product as Product);
  }

}

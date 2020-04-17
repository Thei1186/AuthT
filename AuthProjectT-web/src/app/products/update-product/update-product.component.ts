import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  id: string;
  constructor(private formBuilder: FormBuilder,
              private pService: ProductService,
              private route: ActivatedRoute) {
    this.productForm = this.formBuilder.group({
      name: '',
      price: 0,
      stock: 0
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pService.getProduct(this.id).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        stock: product.stock
      });
    } );
  }

  onSubmit() {
    const productFromForm = this.productForm.value;
    const product = {
      uId: this.id,
      name: productFromForm.name,
      stock: productFromForm.stock,
      price: productFromForm.price
    };
    this.pService.updateProduct(product as Product);
  }
}

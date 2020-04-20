import {Product} from './product';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {DeleteProduct, GetAllProducts} from './product.action';
import {tap} from 'rxjs/operators';

export class ProductStateModel {
  availableProducts: Product[];
}

@State<ProductStateModel>({
  name: 'Product'
})

@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static availableProducts(state: ProductStateModel) {
    return state.availableProducts;
  }

  @Action(GetAllProducts)
  getAllProducts({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          availableProducts: result
        });
      }));
  }

  @Action(DeleteProduct)
  deleteProduct({getState, setState}: StateContext<ProductStateModel>, {uid}: DeleteProduct) {
    this.productService.deleteProduct(uid);
  }
}

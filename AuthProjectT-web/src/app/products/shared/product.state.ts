import {Product} from './product';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {CreateProduct, DeleteProduct, GetAllProducts, GetProduct, UpdateProduct} from './product.action';
import {tap} from 'rxjs/operators';


export class ProductStateModel {
  availableProducts: Product[];
  chosenProduct: Product;
}

@State<ProductStateModel>({
  name: 'Product',
  defaults: {
    availableProducts: [],
    chosenProduct: null
  }
})

@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static availableProducts(state: ProductStateModel) {
    return state.availableProducts;
  }

  @Selector()
  static chosenProduct(state: ProductStateModel) {
    return state.chosenProduct;
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

  @Action(GetProduct)
  getProduct({getState, setState}: StateContext<ProductStateModel>, {uid}: GetProduct) {
    return this.productService.getProduct(uid).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          chosenProduct: result
        });
      }));
  }

  @Action(DeleteProduct)
  deleteProduct({getState, setState}: StateContext<ProductStateModel>, {uid}: DeleteProduct) {
    return this.productService.deleteProduct(uid).then(res => {
      const state = getState();
      const filteredArray = state.availableProducts.filter(product => product.uId !== uid);
      setState({
        ...state,
        availableProducts: filteredArray
      });
    });
  }

  @Action(UpdateProduct)
  updateProduct({getState, setState}: StateContext<ProductStateModel>, {product}: UpdateProduct) {
    return this.productService.updateProduct(product).then( res => {
      const state = getState();
      const productList = [...state.availableProducts];
      const productIndex = productList.findIndex(prod => prod.uId === product.uId);
      productList[productIndex] = res;
      setState({
        ...state,
        availableProducts: productList
      });
    });
  }

  @Action(CreateProduct)
  createProduct({getState, patchState}: StateContext<ProductStateModel>, {product}: CreateProduct) {
    return this.productService.createProduct(product).then( res => {
      const state = getState();
      patchState({
        availableProducts: [...state.availableProducts, res]
      });
    });
  }
}

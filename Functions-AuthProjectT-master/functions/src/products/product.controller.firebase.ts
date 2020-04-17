import {ProductController} from './product.controller';
import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Product} from '../models/product';
import {ProductFunctionsService} from './product.functions.service';

export class ProductControllerFirebase implements ProductController{
  constructor(private productService: ProductFunctionsService) {}

/*
  writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
    const productBefore = snap.before.data() as Product;
    const productAfter = snap.after.data() as Product;
    return this.productService.writeProduct(context.params.uid, productBefore, productAfter);
  };
 */
  createdProduct(snap: DocumentSnapshot, context: EventContext): Promise<Product> {
    const newProduct = snap.data() as Product;
    newProduct.uid = context.params.uid;
    return this.productService.newProduct(newProduct);
  }

  updatedProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
    const productBefore = snap.before.data() as Product;
    const productAfter = snap.after.data() as Product;
    return this.productService.updateProduct(context.params.uid, productBefore, productAfter);
  }



}

import {Product} from '../models/product';

export interface ProductRepository {

  createProduct(product: Product): Promise<Product>;

  deleteProduct(uId: String): Promise<any>;

  updateProduct(uid: string, productAfter: Product): Promise<void>;
}

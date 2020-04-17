import {ProductRepository} from './product.repository';
import {Product} from '../models/product';
import * as admin from 'firebase-admin';

export class ProductRepositoryFirebase implements ProductRepository {
  productsPath = 'products';
  stockPath = 'stock';
  ordersPath = 'orders';

  deleteProduct(uId: String): Promise<any> {
    return this.db().doc(`${this.productsPath}/${uId}`).delete();
  }

  async createProduct(product: Product): Promise<Product> {
    await this.db().collection(`${this.productsPath}`).add(product);
    return Promise.resolve(product);
  }

  db() {
    return admin.firestore();
  }

  async updateProduct(uid: string, product: Product): Promise<void> {
    const batch = this.db().batch();
    const stockRef = this.db().collection(`${this.stockPath}`).where('product.uid', '==', uid).get().then(
      result => {
        if (result.size > 0) {
          result.forEach(async doc => {
            await doc.ref.update(
              {
                product: {
                  name: product.name,
                  price: product.price,
                  uid: product.uid
                }
              });
           await batch.set(this.db().collection(`${this.stockPath}`).doc(`${doc.ref.id}`), doc.data());
          });
        }
      }
    );
    console.log(stockRef);
    await batch.commit();
    return Promise.resolve();
  }
}

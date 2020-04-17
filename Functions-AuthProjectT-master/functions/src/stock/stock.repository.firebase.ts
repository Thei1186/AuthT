import {Stock} from '../models/stock';
import * as admin from 'firebase-admin';
import {StockRepository} from './stock.repository';
import {Product} from '../models/product';
import {Orderline} from '../models/orderline';
import DocumentReference = admin.firestore.DocumentReference;
import DocumentData = admin.firestore.DocumentData;

export class StockRepositoryFirebase implements StockRepository {

  stockPath = 'stock';
  ordersPath = 'orders';

  async createStock(product: Product, count: number): Promise<Stock> {
    const stock: Stock = {product: product, count: count};
    await this.db().collection(`${this.stockPath}`).add(stock);
    return Promise.resolve(stock);
  }

  db() {
    return admin.firestore();
  }

  async lowerStock(product: Product, amount: number): Promise<void> {
    const doc = await this.db().collection(`${this.stockPath}`).doc(`${product.uid}`)
      .get();
    const stock = doc.data() as Stock;
    stock.count = stock.count - amount;
    await this.db().doc(`${this.stockPath}/${product.uid}`).set(stock);
    return Promise.resolve();

  }

  async lowerStocks(orderLines: Orderline[]): Promise<void> {
    const batch = this.db().batch();
    const documentsArray: DocumentReference<DocumentData>[] = [];
    orderLines.forEach(async (ol) => {
      documentsArray.push(this.db().collection(`${this.stockPath}`)
        .doc(`${ol.product.uid}`));
    });
    const stocks = await this.db().getAll(...documentsArray);
    stocks.forEach(snap => {
      const stock = snap.data() as Stock;
      orderLines.forEach(ol => {
        if (ol.product.uid === snap.id) {
          stock.count = stock.count - ol.count;
        }
      });
      batch.set(this.db().collection(`${this.stockPath}`)
        .doc(`${snap.id}`), stock);
    });
    await batch.commit();
    return Promise.resolve();
  }


}

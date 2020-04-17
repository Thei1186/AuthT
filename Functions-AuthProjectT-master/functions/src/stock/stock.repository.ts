import {Stock} from '../models/stock';
import {Product} from '../models/product';
import {Orderline} from '../models/orderline';


export interface StockRepository {
  createStock(product: Product, count: number): Promise<Stock>;

  lowerStock(product: Product, amount: number): Promise<void>;

  lowerStocks(orderLines: Orderline[]): Promise<void>;
}

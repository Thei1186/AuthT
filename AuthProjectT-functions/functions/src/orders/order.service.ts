import {OrderRepository} from './order.repository';
import {StockRepository} from '../stock/stock.repository';
import {Order} from '../models/order';

export class OrderService {
  constructor(private orderRepo: OrderRepository, private stockRepo: StockRepository) {
    console.log(this.orderRepo);
    console.log(this.stockRepo);
  }

  async executeOrder(order: Order): Promise<Order> {
    if (!order.orderLines || order.orderLines.length < 1) {
      throw new TypeError('The order needs to have at least one order line when executing');
    }
    if (order.orderLines.length === 1) {
      console.log("single orderline");
      await this.stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].count);
    } else {
      console.log("multiple orderlines");
      await this.stockRepo.lowerStocks(order.orderLines);
    }

    return Promise.resolve(order);
  }
}

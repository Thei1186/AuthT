import {Product} from '../../src/models/product';
import {Stock} from '../../src/models/stock';
import {Orderline} from '../../src/models/orderline';
import {Order} from '../../src/models/order';
import {User} from '../../src/models/user';


export class DataHelper {
  product1: Product = {
    name:'Product 1',
    price: 25,
    uid: 'p1'
  };

  user1: User = {
  uid: 'u1',
  email: 'thisisaemail@email.com',
  photoUrl: 'u1PU',
  role: 'user',
  displayName:'user1Display',
  name: 'User1'
  };

  stock1: Stock = {
    count: 5,
    product: this.product1
  };

  ol1: Orderline = {
    uid: 'ol1',
    product: this.product1,
    count: 1
  };

  ol2: Orderline = {
    uid: 'ol2',
    product: this.product1,
    count:2
  };

  order1: Order = {
    uid: 'o1',
    date: Date.now(),
    orderLines: [this.ol1]
  };

  order2: Order = {
    uid: 'o2',
    date: Date.now(),
    orderLines: [this.ol1, this.ol2]
  };

}

import {DataHelper} from './data.helper';
import {IMock, It, Mock} from 'moq.ts';
import {OrderRepository} from '../../src/orders/order.repository';
import {ProductRepository} from '../../src/products/product.repository';
import {StockRepository} from '../../src/stock/stock.repository';
import {UserRepository} from '../../src/users/user.repository';


export class RepositoryHelper {
  constructor(private db: DataHelper) {
  }
  getProductRepositoryMock(): IMock<ProductRepository> {
    return new Mock<ProductRepository>()
      .setup(repo => repo.createProduct(this.db.product1))
      .returns(Promise.resolve(this.db.product1))
      .setup(repo => repo.updateProduct(this.db.product1.uid, this.db.product1))
      .returns(Promise.resolve(this.db.product1));
  }
  getOrderRepositoryMock(): IMock<OrderRepository> {
    return new Mock<OrderRepository>();
  }

  getStockRepositoryMock(): IMock<StockRepository> {
    return new Mock<StockRepository>()
      .setup(stockRepo => stockRepo.createStock(this.db.product1,5))
      .returns(Promise.resolve(this.db.stock1))
      .setup(stockRepo => stockRepo.lowerStock(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve())
      .setup(stockRepo => stockRepo.lowerStocks(It.IsAny()))
      .returns(Promise.resolve());
  }

  getUserRepositoryMock(): IMock<UserRepository> {
    return new Mock<UserRepository>()
      .setup(userRepo => userRepo.deleteUser(this.db.user1.uid))
      .returns(new Promise((resolve, reject) => {resolve()}));
  }
}

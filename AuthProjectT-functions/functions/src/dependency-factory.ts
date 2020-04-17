import {UserController} from './users/user.controller';
import {UserRepository} from './users/user.repository';
import {UserRepositoryFirebase} from './users/user.repository.firebase';
import {UserFunctionsService} from './users/user.functions.service';
import {UserControllerFirebase} from './users/user.controller.firebase';
import {ProductController} from './products/product.controller';
import {ProductFunctionsService} from './products/product.functions.service';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {StockRepository} from './stock/stock.repository';
import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {OrderController} from './orders/order.controller';
import {OrderControllerFirebase} from './orders/order.controller.firebase';
import {OrderRepositoryFirebase} from './orders/order.repository.firebase';
import {OrderService} from './orders/order.service';


export class DependencyFactory {
  getUserController(): UserController {
    const repo: UserRepository = new UserRepositoryFirebase();
    const service: UserFunctionsService = new UserFunctionsService(repo);
    return new UserControllerFirebase(service);
  }

  getProductController(): ProductController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: ProductFunctionsService = new ProductFunctionsService(repoStock, repoProduct);
    return new ProductControllerFirebase(service);
  }

  getOrderController(): OrderController {
    const repoOrder: OrderRepositoryFirebase = new OrderRepositoryFirebase();
    const repoStock: StockRepositoryFirebase = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(repoOrder, repoStock);
    return new OrderControllerFirebase(service);
  }
}

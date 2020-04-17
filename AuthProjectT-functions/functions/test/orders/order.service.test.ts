import {DataHelper} from '../helpers/data.helper';
import {IMock, Times} from 'moq.ts';
import {StockRepository} from '../../src/stock/stock.repository';
import {OrderRepository} from '../../src/orders/order.repository';
import {OrderService} from '../../src/orders/order.service';
import {RepositoryHelper} from '../helpers/repository.helper';

describe('OrderService', () => {
  let dataHelper: DataHelper;
  let repoHelper: RepositoryHelper;
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;

  beforeEach(() => {
    dataHelper = new DataHelper();
    repoHelper = new RepositoryHelper(dataHelper);
    stockRepository = repoHelper.getStockRepositoryMock();
    orderRepository = repoHelper.getOrderRepositoryMock();
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
  });

  it('OrderService should have an order- and stock repository', () => {
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
    expect(orderService).toBeDefined();
  });

  it('When a product is bought it should be added to the order collection and stock should be counted down ', async () => {
    const order = dataHelper.order1;
    await orderService.executeOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].count),
      Times.Exactly(1));
  });

  it('When multiple products are bought the stock should down appropriately for each product', async () => {
    const order = dataHelper.order2;
    const orderLines = order.orderLines;
    await orderService.executeOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStocks(orderLines),
      Times.Exactly(1));
  });


  it('Execute Order should throw an exception if order does not have any orderLines', async () => {
    const order = dataHelper.order1;
    order.orderLines = [];
    await expect(orderService.executeOrder(order)).rejects.toThrow(TypeError);
  });
});

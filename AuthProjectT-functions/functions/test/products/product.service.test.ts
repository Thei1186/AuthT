import {IMock, Times} from 'moq.ts';
import {ProductFunctionsService} from '../../src/products/product.functions.service';
import {Product} from '../../src/models/product';
import {StockRepository} from '../../src/stock/stock.repository';
import {DataHelper} from '../helpers/data.helper';
import {ProductRepository} from '../../src/products/product.repository';
import {RepositoryHelper} from '../helpers/repository.helper';

describe('ProductService', () => {
  let helper: DataHelper;
  let repoHelper: RepositoryHelper;
  let productRepository: IMock<ProductRepository>;
  let stockRepository: IMock<StockRepository>;
  let productFunctionsService: ProductFunctionsService;


  beforeEach(() => {
    helper = new DataHelper();
    repoHelper = new RepositoryHelper(helper);
    productRepository = repoHelper.getProductRepositoryMock();
    stockRepository = repoHelper.getStockRepositoryMock();

    productFunctionsService = new ProductFunctionsService( stockRepository.object(), productRepository.object());
  });

  it('Product Service should have a repository', () => {
    productFunctionsService = new ProductFunctionsService( stockRepository.object(), productRepository.object());
    expect(productFunctionsService).toBeDefined();
  });

  it('When a product is created a promise containing the product is returned', async () => {
    const productAfter: Product = await productFunctionsService.newProduct(helper.product1);
    expect(productAfter).toBe(helper.product1);
  });

  it('When a new product is added, a stock with 5 should be created for it ', async () => {
    await productFunctionsService.newProduct(helper.product1);
    stockRepository.verify(stockRepo => stockRepo.createStock(helper.product1, 5), Times.Exactly(1));
  });

  it('When a product is updated it should be updated in all documents wherein it is', async () => {
    const productAfter: Product = {
        name:'Product changed',
        price: 24,
        uid: 'p1'
    };
    await productFunctionsService.updateProduct(helper.product1.uid, helper.product1, productAfter);
    productRepository.verify(productRepo => productRepo.updateProduct(helper.product1.uid, productAfter), Times.Exactly(1));
  });

});


import {Product} from '../models/product';
import {StockRepository} from '../stock/stock.repository';
import {ProductRepository} from './product.repository';



export class ProductFunctionsService {
  constructor(private stockRepository: StockRepository, private productRepository: ProductRepository) {
  }

  /*
    writeProduct(
      uId: string,
      productBefore: Product,
      productAfter: Product
    ): Promise<void> {
      if (productAfter) {
        let stock;
        if (productBefore) {
          stock = productBefore.stock;
        } else {
          stock = 5;
        }
        return this.productRepository.setProduct(uId,{
          name: productAfter.name,
          price: productAfter.price,
          stock: stock
        });
      } else {
        return this.productRepository.deleteProduct(uId);
      }
    }

   */
  async newProduct(product: Product): Promise<Product> {
      //await this.productRepository.createProduct(product);
      await this.stockRepository.createStock(product, 5);
      return Promise.resolve(product);
  }

  async updateProduct(prodId: string, productBefore: Product, productAfter: Product): Promise<void> {
      productAfter.uid = prodId;
      await this.productRepository.updateProduct(prodId, productAfter);
    return Promise.resolve();
  }
}


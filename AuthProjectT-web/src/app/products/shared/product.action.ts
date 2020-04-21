import {Product} from './product';

export class GetAllProducts {
  static readonly type = '[Product] GetAllProducts';
}

export class DeleteProduct {
  static readonly type = '[Product] DeleteProduct';

  constructor(public uid: string) {
  }
}

export class UpdateProduct {
  static readonly type = '[Product] UpdateProduct';

  constructor(public product: Product) {
  }
}

export class GetProduct {
  static readonly type = '[Product] GetProduct';

  constructor(public uid: string) {
  }
}

export class CreateProduct {
  static readonly type = '[Product] CreateProduct';

  constructor(public product: Product) {
  }
}

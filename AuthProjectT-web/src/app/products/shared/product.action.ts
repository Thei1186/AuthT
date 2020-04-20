export class GetAllProducts {
  static readonly type = '[Product] GetAllProducts';
}

export class DeleteProduct {
  static readonly type = '[Product] DeleteProduct';

  constructor(public uid: string) {
  }
}

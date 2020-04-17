import {Product} from './product';

export interface Orderline {
 uid: string;
 product: Product;
 count: number;
}

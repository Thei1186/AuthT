import {Orderline} from './orderline';

export interface Order {
  uid: string;
  date: number;
  orderLines: Orderline[];
}

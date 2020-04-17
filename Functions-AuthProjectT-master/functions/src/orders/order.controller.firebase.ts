import {OrderController} from './order.controller';
import {EventContext} from 'firebase-functions';
import {Order} from '../models/order';
import {OrderService} from './order.service';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export class OrderControllerFirebase implements OrderController {
  constructor(private orderService: OrderService) {
  }
  executeOrder(snap: DocumentSnapshot, context: EventContext): Promise<Order> {
    const order = snap.data() as Order;
    order.uid = context.params.uid;
    return this.orderService.executeOrder(order);
  }

}

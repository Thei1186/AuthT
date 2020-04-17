import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Change, EventContext} from 'firebase-functions';
import {Product} from '../models/product';

export interface ProductController {
  //writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

  createdProduct(snap: DocumentSnapshot, context: EventContext): Promise<Product>;

  updatedProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
}

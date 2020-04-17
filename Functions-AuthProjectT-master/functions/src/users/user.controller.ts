import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export interface UserController {
  deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void>;

}

import {UserFunctionsService} from './user.functions.service';
import {UserController} from './user.controller';
import {EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';


export class UserControllerFirebase implements UserController{
  constructor(private userService: UserFunctionsService) {}

  deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    return this.userService.deleteUser(context.params.uid);
  };
}

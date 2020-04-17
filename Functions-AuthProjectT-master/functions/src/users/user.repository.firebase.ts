import {UserRepository} from './user.repository';

import * as admin from 'firebase-admin';
import {User} from '../models/user';

export class UserRepositoryFirebase implements UserRepository{
  usersPath = 'users';
  createUser(user: User): Promise<any> {
    return this.db().doc(`${this.usersPath}/${user.uid}`)
      .set(user);
  }

  deleteUser(uid: string): Promise<any> {
    return this.db().doc(`${this.usersPath}/${uid}`)
      .delete();
  }

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}

import {User} from '../models/user';


export interface UserRepository {
  createUser(user: User): Promise<any>;
  deleteUser(uid: string): Promise<any>;
}

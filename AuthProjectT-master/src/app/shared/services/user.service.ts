import {Injectable} from '@angular/core';
import {User} from '../user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import set = Reflect.set;
import {debuglog} from 'util';

import Query = firebase.database.Query;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.user = angularFireAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).snapshotChanges()
          .pipe(
            tap(us => {
            }),
            map(userAndMetaData => {
              const data = userAndMetaData.payload.data();
              const newUser: User = {
                uid: userAndMetaData.payload.id,
                displayName: data.displayName,
                email: data.email,
                name: data.name,
                photoUrl: data.photoUrl,
                role: data.role
              };
              return newUser;
            })
          );
      } else {
        return of(null);
      }
    }));
  }

  updateUser(user: User) {
    const data = {
      email: user.email,
      name: user.name,
      displayName: user.displayName,
      photoUrl: user.photoUrl
    };

    this.afs.collection('users')
      .doc(user.uid)
      .set(data, {merge: true}).then(u => {
      this.angularFireAuth.auth.currentUser.updateEmail(data.email).finally(() => {
        this.angularFireAuth.auth.currentUser.updateProfile(
          {
            displayName: data.displayName,
            photoURL: data.photoUrl
          }).catch(err => {
          console.log('Something went wrong', err.message);
        });
      });
    });
  }

  getUser(): Observable<User> {
    return this.user;
  }

  getUsers(): Observable<User[]> {
    return this.afs.collection<User>('users').valueChanges();
  }

  deleteUser(uid: string) {
    this.afs.collection('users').doc(uid).delete().then(() => {
      console.log('Document deleted');
    }).catch(e => {
      console.error('Error removing document: ', e);
    });
  }
}

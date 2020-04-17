import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

import {User} from '../user';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth,
              private userService: UserService,
              private afs: AngularFirestore,
              private router: Router) {
    this.user$ = userService.getUser();
  }

  /* Sign up */
  SignUp(user: User, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(user.email, password)
      .then(res => {
        this.afs.collection('users').doc(res.user.uid).set({
          email: res.user.email,
          displayName: user.displayName,
          photoUrl: res.user.photoURL,
          name: user.name
        });
        this.angularFireAuth.auth.currentUser.updateProfile({
          displayName: res.user.displayName,
          photoURL: res.user.photoURL
        });
        console.log('You are Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigateByUrl('users/profile');
        console.log('You are Successfully logged in!');
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {
      console.log('Successfully logged out');
      this.router.navigateByUrl('');
    }).catch(err => {
      console.log('Something went wrong', err.message);
    });
  }

  ResetPass(newPassword: string) {
    this.angularFireAuth.auth.currentUser.updatePassword(newPassword).then(res => {
      console.log('Password has been changed');
    }).catch(err => {
      console.log('Something went wrong', err.message);
    });
  }
}

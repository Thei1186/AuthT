import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private aService: AuthenticationService,
              private uService: UserService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.uService.getUser().pipe(map(user => {
      if (user === null) {
        this.router.navigateByUrl('users/login');
        return false;
      }
      return true;
    }));
  }


  private checkLogin(): boolean {
    if ( this.uService.getUser()) {
      console.log('yay');
      return true;
    }
    console.log('nay');
    this.router.navigateByUrl('users/login');
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}

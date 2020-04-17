import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/user';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public aService: AuthenticationService,
              private uService: UserService,
              private router: Router) {
    this.user = aService.user$;
  }

  newPassword: string;
  user: Observable<User>;

  ngOnInit() {
  }

  rerouteToLogin() {
    this.router.navigate(['users/login']);
  }

  updateProfile() {
    this.router.navigate(['users/update-profile']);
  }

  updatePassword() {
    if (confirm('Are you sure you want to change your password?')) {
      this.aService.ResetPass(this.newPassword);
      console.log('Password changed');
    }
  }
}

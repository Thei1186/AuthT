import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private aService: AuthenticationService,
              private uService: UserService) {
  }

  user;

  ngOnInit() {
    this.user = this.uService.user;
  }

  logout() {
    this.aService.SignOut();
  }

  checkPrivilege(): boolean {
    console.log(this.user.role);
    return this.user.role === 'superAdmin';
  }
}

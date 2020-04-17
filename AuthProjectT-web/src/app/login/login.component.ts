import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {User} from '../shared/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private aService: AuthenticationService
  ) {
    this.user = this.aService.user$;
  }

  user: Observable<User>;
  email: string;
  password: string;

  ngOnInit() {
  }

  signIn() {
    this.aService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  createUser() {
    this.router.navigateByUrl('users/create');
  }
}

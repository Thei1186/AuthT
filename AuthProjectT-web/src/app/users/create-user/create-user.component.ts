import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../shared/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  password: string;
  user: User;

  constructor(private authService: AuthenticationService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      name: '',
      displayName: '',
      email: '',
      photoUrl: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const userFromForm = this.userForm.value;
    const newUser = {
      name: userFromForm.name,
      email: userFromForm.email,
      displayName: userFromForm.displayName,
      photoUrl: userFromForm.photoUrl,
      role: 'user'
    };
    this.authService.SignUp(newUser as User, userFromForm.password);
  }
}

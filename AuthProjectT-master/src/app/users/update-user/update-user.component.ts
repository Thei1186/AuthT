import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../shared/user';
import {UserService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateForm: FormGroup;
  user: User;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.updateForm = formBuilder.group({
      name: '',
      displayName: '',
      email: '',
      photoUrl: ''
    });
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
        this.updateForm.patchValue({
          name: user.name,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl
        });
      });
  }


  ngOnInit(): void {

  }
  onSubmit() {

    const userFromForm = this.updateForm.value;
    const updatedUser = {
      uid: this.user.uid,
      name: userFromForm.name,
      email: userFromForm.email,
      displayName: userFromForm.displayName,
      photoUrl: userFromForm.photoUrl,
      role: this.user.role
    };
    this.userService.updateUser(updatedUser as User);
    this.returnToProfile();
  }


  returnToProfile() {
    this.router.navigate(['users/profile']);
  }

}

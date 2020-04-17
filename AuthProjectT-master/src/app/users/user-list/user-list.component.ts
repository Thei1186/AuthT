import { Component, OnInit } from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {User} from '../../shared/User';
import {UserService} from '../../shared/services/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private uService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.uService.getUsers();
  }

  assignRole(uid: string) {

  }

  deleteUser(uid: string) {
    this.uService.deleteUser(uid);
  }
}

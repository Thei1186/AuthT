import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: Observable<User>;
  constructor() { }

  ngOnInit() {
  }

}

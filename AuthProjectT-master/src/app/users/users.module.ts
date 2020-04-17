import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {ProfileComponent} from './user-profile/profile.component';
import {LoginComponent} from '../login/login.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomModule} from '../shared/modules/custom/custom.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations:
    [
      UsersComponent,
      ProfileComponent,
      LoginComponent,
      CreateUserComponent,
      UpdateUserComponent,
      UserListComponent,
    ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    CustomModule,
    FlexLayoutModule
  ]
})
export class UsersModule {
}

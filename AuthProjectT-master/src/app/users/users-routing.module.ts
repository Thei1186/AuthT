import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {ProfileComponent} from './user-profile/profile.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {LoginComponent} from '../login/login.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UserListComponent} from './user-list/user-list.component';
import {AuthGuard} from '../shared/guard/auth.guard';

export const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'create', component: CreateUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'update-profile', component: UpdateUserComponent, canActivate: [AuthGuard]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/profile', pathMatch: 'full', canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

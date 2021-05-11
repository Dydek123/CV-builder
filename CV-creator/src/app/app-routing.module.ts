import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginComponent} from "./login/login.component";
import {AppRegisterComponent} from "./app-register/app-register.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreatorComponent} from "./creator/creator.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: AppRegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'createCV', component: CreatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

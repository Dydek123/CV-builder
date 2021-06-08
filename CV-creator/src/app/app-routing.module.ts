import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {LoginComponent} from "./components/login/login.component";
import {AppRegisterComponent} from "./components/app-register/app-register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {CreatorComponent} from "./components/creator/creator.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: AppRegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'createCV', component: CreatorComponent, canActivate: [AuthGuard]},
  {path: 'createCV/:id', component: CreatorComponent, canActivate: [AuthGuard]},
  {path: '**', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

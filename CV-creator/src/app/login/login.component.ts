import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AuthService} from "../auth.service";
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  email:string = '';
  password:string = '';
  message:string = '';
  errors:string[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  onLogin() {
    const user:User = {email:this.email, password:this.password}
    this.authService.login(user)
      .subscribe(data => {
        console.log(data)
      });
  }
  //  this.http.post<{ status: string, errors: string[] }>('http://localhost:8080/login',{email: this.email, password: this.password})
  //    .subscribe((responese) => {
  //      this.message = responese.status;
  //      this.errors = responese.errors;
  //      this.authService.saveUser(this.user, 'http://localhost:8080/login')
  //        .subscribe(data => {
  //          console.log('Successful');
  //        });
  //    })
  // }
}

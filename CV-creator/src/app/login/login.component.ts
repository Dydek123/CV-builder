import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  login:string = '';
  password:string = '';
  message:string = '';
  constructor() { }
  onLogin() {
    if (this.login === 'admin' && this.password==='admin') this.message='Succesfully logged';
    else this.message='Incorrect data';
  }
}

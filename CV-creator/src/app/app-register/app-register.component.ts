import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent{
  email:string = '';
  password:string = '';
  repeatPassword:string = '';
  message:string = '';

  onRegister() {
    if (this.email === 'admin@wp.pl' && this.password===this.repeatPassword) this.message='Success';
    else this.message='User with this email already exist';
  }
}

import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth.service";
import {authResponse} from "../../model/authResponse";
import {User} from "../../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  message: string|undefined = '';
  errors: string[]|undefined = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  onRegister():void {
    const user:User = {email:this.email, password: this.password, repeatPassword:this.repeatPassword}
    this.authService.register(user)
      .subscribe((data:authResponse) => {
        if (data.status === 'success') this.router.navigate([''])
        this.errors = data.errors;
      });
  }
}

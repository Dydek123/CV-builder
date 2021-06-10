import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.scss']
})
export class AppRegisterComponent {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  message: string = '';
  errors: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  onRegister():void {
    this.http.post<{ status: string, errors: string[] }>('http://localhost:8080/register', {
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword
    })
      .subscribe((responese) => {
        this.message = responese.status;
        this.errors = responese.errors;
        if (responese.status === 'success') this.router.navigate(['login'])
      })
  }
}

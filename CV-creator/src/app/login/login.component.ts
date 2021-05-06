import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

  onLogin() {
   this.http.post<{ status: string, errors: string[] }>('http://localhost:8080/login',{email: this.email, password: this.password})
     .subscribe((responese) => {
       this.message = responese.status;
       this.errors = responese.errors;
     })
  }
}

import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {User} from '../../model/User';
import {Router} from "@angular/router";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  status: string | undefined;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  onLogin(): void {
    this.status = '';
    const user: User = {email: this.email, password: this.password}
    this.authService.login(user)
      .subscribe(data => {
        if (data.status === 'success') this.router.navigate([''])
        this.status = data.status;
      });
  }
}

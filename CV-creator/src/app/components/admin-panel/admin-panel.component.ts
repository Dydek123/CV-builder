import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { authResponse } from 'src/app/model/authResponse';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  email: string = '';
  password: string = '';
  message: string | undefined;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  onSubmit(): void {
    this.message = '';
    const user: User = {email: this.email}
    this.authService.remove(user)
      .subscribe((data:authResponse) => {
        if (data.status === 'success') {
          this.message = 'User has been succesfully removed'
        } else {
          this.message = data.status;
        }
      });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/User"
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import authResponse from "../../../Backend/interfaces/authResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/'
  constructor(private httpClient: HttpClient) {
  }
  login(model: User): Observable<User>{
    return this.saveUser(model, this.baseUrl+'login');
  }
  register(model: User): Observable<User>{
    return this.saveUser(model, 'register');
  }
  private saveUser(model: User, url: string): Observable<User>{
    return this.httpClient.post<authResponse>(url, model).pipe(
      map((response: authResponse) =>  {
        if (response.status === 'success'){
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response.user;
      })
    );
  }
}

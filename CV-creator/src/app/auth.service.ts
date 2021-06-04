import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/User"
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {authResponse} from "./model/authResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/'

  constructor(private httpClient: HttpClient) {
  }

  login(model: User): Observable<authResponse> {
    return this.saveUser(model, this.baseUrl + 'login');
  }

  register(model: User): Observable<User> {
    return this.saveUser(model, this.baseUrl + 'register');
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    try {
      if (localStorage.getItem('user')) {
        this.httpClient.get<{ status: boolean }>(this.baseUrl + 'validateToken')
          .subscribe(
            data => console.log('success', data),
            error => console.log('oops', error)
          )
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  private saveUser(model: User, url: string): Observable<authResponse> {
    return this.httpClient.post<authResponse>(url, model).pipe(
      map((response: authResponse) => {
        let auth: authResponse;
        if (response.status === 'success') {
          auth = {status: response.status, email: response.email, token: response.token};
          localStorage.setItem('user', JSON.stringify(auth));
          return auth;
        }
        return {status: response.status};
      })
    );
  }
}

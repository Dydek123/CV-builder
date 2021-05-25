import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(<string>localStorage.getItem('user'));
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`
        }
      });
      console.log(request)
    }
    return next.handle(request);
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthHttpService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = window.sessionStorage.getItem("token");

    if(userToken){
      //reset the header and insert the token in the header of each request
      const cloned = req.clone({
        headers:req.headers.set("authorization",userToken)
      })

      //send the request
      return next.handle(cloned);
    }else{
      return next.handle(req);
    }
  }
}

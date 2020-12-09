import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private _client:HttpClient,private _router:Router) { }

  VerifyAndGetUser(email:string,password:string){
    return this._client.post("http://localhost:3000/signin"
    ,{email:email,password:password});
  }

  getTokenUser(){
    return sessionStorage.getItem("token");
  }

  setSession(auth_info){
    //for the item
    sessionStorage.removeItem("idUser");
    sessionStorage.setItem("idUser",auth_info.idUser);

    //for the token
    sessionStorage.removeItem("token");
    sessionStorage.setItem("token",auth_info.idToken);
  }

  logout(){
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("token");
  }

}

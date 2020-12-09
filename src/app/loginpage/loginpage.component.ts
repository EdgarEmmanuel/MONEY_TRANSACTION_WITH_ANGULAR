import { Router } from '@angular/router';
import { UserInfoService } from './../user-info.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private _userInfo:UserInfoService,private _router:Router) { }

  ngOnInit(): void {
  }

  sendData(data:NgForm){
    const email = data.value["login"];
    const password = data.value["password"];

    if(email==="" || password===""){
      this._router.navigate(["/"]);
    }else{
       let val=this._userInfo.VerifyAndGetUser(email,password)
       .subscribe((data:any)=>{
         this._userInfo.setSession(data);
         if(data.error){
           this._router.navigate(["home"]);
         }else{
           this._router.navigate(["/"]);
         }
        });

      
    }

  }

}

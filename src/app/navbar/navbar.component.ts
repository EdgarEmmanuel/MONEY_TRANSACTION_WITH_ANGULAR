import { UserInfoService } from './../user-info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _serviceUser:UserInfoService,private _router:Router) { }

  ngOnInit(): void {
  }

  deconnex(){
    this._serviceUser.logout();
    this._router.navigate(["/login"]);
  }

}

import { UserActionService } from './../user-action.service';
import { ApiSourcesService } from './../api-sources.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  TRANSACTIONS:any[];
  solde_account:number=0;
  idUser:number=parseInt(sessionStorage.getItem("idUser"));

  constructor(private service:ApiSourcesService
    ,private _userService:UserActionService) { }

  

  ngOnInit(): void {
    //get the solde of the account
    this._userService.getInfoCompte(this.idUser).subscribe(
      (data:any)=>{
        this.solde_account=data.data[0].solde;
      },
      (err)=>{
        throw err;
      }
    )

    //get all the recent transaction;
    this._userService.getRecentTransaction(this.idUser).subscribe(
      (data:any)=>{
        this.TRANSACTIONS=data.data;
      }, 
      (err)=>{
        throw err;
      }
    )

  }

}

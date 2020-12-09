import { UserActionService } from './../user-action.service';
import { ApiSourcesService } from './../api-sources.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transact-details',
  templateUrl: './transact-details.component.html',
  styleUrls: ['./transact-details.component.css']
})
export class TransactDetailsComponent implements OnInit {
  
  id:number;
  id_user:number=parseInt(sessionStorage.getItem("idUser"));
  TRANSACTION:any;
  EMMETEUR:any;
  RECEPTEUR:any;

  constructor(private actRoute:ActivatedRoute,
    private _userAction:UserActionService,private _router:Router) { }

  ngOnInit(): void {
    //fetch the id from the route
    this.id = parseInt(this.actRoute.snapshot.params[("id")]);
    
    //get the data from the only one 
    this._userAction.getDetailsOfOneTransaction(this.id).subscribe(
      (data:any)=>{
        console.log(data);
        this.TRANSACTION=data.data;
      },
      (error)=>{
        this._router.navigate(["login"]);
      }
    )
  }

}

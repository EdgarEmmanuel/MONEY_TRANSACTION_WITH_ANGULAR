import { UserActionService } from './../user-action.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  idUser:number=parseInt(sessionStorage.getItem("idUser"));
  constructor(private _userAction:UserActionService) { }

  TRANSACTIONS:any[];

  ngOnInit(): void {
    this. _userAction.getAllTransactionOfUser(this.idUser).subscribe(
      (data:any)=>{
        this.TRANSACTIONS=data.data;
      },
      (err)=>{
        throw err;
      }
    )
  }

}

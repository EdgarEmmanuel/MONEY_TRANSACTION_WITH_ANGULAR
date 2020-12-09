import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() num;
  idUser:number=parseInt(sessionStorage.getItem("idUser"));

  constructor() { }

  ngOnInit(): void {
  }

}

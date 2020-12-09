import { Router } from '@angular/router';
import { UserActionService } from './../user-action.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depot-form',
  templateUrl: './depot-form.component.html',
  styleUrls: ['./depot-form.component.css']
})
export class DepotFormComponent implements OnInit {

  message:string="";

  constructor(private _userActionService:UserActionService,private _router:Router) { }

  ngOnInit(): void {
  }

  sendDepot(Form:NgForm){
      const cni = Form.value["cni"];
      const montant = parseInt(Form.value["montant"]);

      //fetch the id of the desti
      this._userActionService.getCinDestinataire(cni).subscribe(
        (data:any)=>{
         if(data.success){
            const idReceptor = parseInt(data.data[0].id);
            const idSender = parseInt(sessionStorage.getItem("idUser"));

            //do the transaction
            this._userActionService
                .insertActionDepotFromUser(montant,idReceptor,idSender)
                .subscribe(
              (data:any)=>{
                if(data.success){
                    this._router.navigate(["transactions"]);
                }else{
                  this.message = "OUPS !! VEUILLEZ REESSAYEZ PLUS TARD";
                }
              }
            )
         }else{
          this.message = "CIN NON EXISTANT ";
         }
        },
        (err)=>{
          this.message = "OUPS REESSAYEZ PLUS TARD";
          this._router.navigate(["login"]);
        }
      )


      //empty the form 
      Form.resetForm();
  }

}

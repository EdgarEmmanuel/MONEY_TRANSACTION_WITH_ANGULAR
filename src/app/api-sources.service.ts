import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiSourcesService {

  ARRAY:any[]=[
    {id:2,number:12000,type:"ENVOYE"},
    {id:3,number:24000,type:"RECU"}
  ];

  constructor() { }

  getAllData():any[]{
    return this.ARRAY;
  }


  getOneTransaction(id:number){
    
    let v = this.ARRAY.map((transfert)=>{
      if(transfert.id==id){
        return transfert;
      }
      //return transfert;
    })

    return v;
    
  }

}

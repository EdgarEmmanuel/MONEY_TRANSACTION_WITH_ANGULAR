import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private _httpClient:HttpClient) { }

  public getInfoCompte(id:number):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/compte/${id}`);
  }

  public getRecentTransaction(id:number):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/recent/${id}`);
  }

  public getAllTransactionOfUser(id:number):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/all_envoi_user/${id}`);
  }

  public getDetailsOfOneTransaction(id_transaction:number):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/envoi/${id_transaction}`);
  }

  public getInfoUser(id_user:number):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/user/${id_user}`);
  }


  public getCinDestinataire(cin:string):Observable<any[]>{
    return this._httpClient.get<any[]>(`http://localhost:3000/get_cni/${cin}`);
  }


  public insertActionDepotFromUser(montant:number,idReceptor:number
    ,idSender:number):Observable<any[]>{
      return this._httpClient.post<any[]>(`http://localhost:3000/insert_retrait`,
        {
          "montant":montant,
          "emmeteur_id":idSender,
          "recepteur_id":idReceptor
        }
      )
  }


    

}

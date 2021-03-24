import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/Client';
import { Transaction } from '../interfaces/Transaction';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionSubject = new Subject();
   
  constructor(private http: HttpClient, private authService: AuthService) {}


  
    // on recupere les transactions
    getTransactions(listItems: Transaction[], type: string,offset: number, limit: number, telephoneUser=null, somme?: number){
      const url = environment.apiUrl +'/agence/transactions/?type='+type+'&offset='+offset+'&limit='+limit;
      this.http.get<Transaction[]>(url).subscribe(
        (data) => {
          if(telephoneUser){
            data = data.filter(item => +item.telephone_user == +telephoneUser)
          }
          data.forEach(element => {
                listItems.push(element)
          });
        }
      )
      return listItems;
    }

    // calculer la somme
    calculateCount(tableau: Transaction[]){
        let somme = tableau.map(a => +a.frais).reduce(function(a, b)
        {
          return a + b;
        });
        return somme;
    }


}

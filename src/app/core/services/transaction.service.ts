import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/Client';
import { Transaction } from '../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
   depots: Transaction[];
   retraits: Transaction[];
   
  constructor(private http: HttpClient) { 
    // this.depots = [];
    this.retraits = [];
  }

  // retrait
  // doTransaction(transaction: Transaction){
  //   const url = environment.apiUrl + '/transactions';
  //   return this.http.post<Transaction>(url, transaction);
  // }

  // fonction permettant de recuperer les commissions
  getCommissions(): any{
    const url = environment.apiUrl + '/agence/transactions';
     return this.http.get(url).pipe(map(resutl => {
        resutl["test"] = "test";
    }));
  }
}

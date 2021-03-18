import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  // fonction pour faire une transaction
  doTransaction(type: string, montant: string,frais: string, emetterNom: string, emetterPrenom: string, emetterCni: string, emetterTelephone: string, receiverNom: string, receiverPrenom: string, receiverTelephone: string): Observable<Transaction>{
    let transaction: Transaction;
    transaction = {
      "type": type,
      "montant": montant,
      "frais": frais,
      "client_depot": 
      {
          "nom": emetterNom,
          "prenom": emetterPrenom,
          "telephone": emetterTelephone,
          "numeroCni": emetterCni
      },
      "client_retrait": 
      {
          "nom": receiverNom,
          "prenom": receiverPrenom,
          "telephone": receiverTelephone
      }
    }
    const url = environment.apiUrl + '/transactions';
    return this.http.post<Transaction>(url, transaction);
  }
}

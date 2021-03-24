import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Transaction } from '../../interfaces/Transaction';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  is_shownMesTransaction: boolean = true;
  is_shownAllTransaction: boolean = false;
  allTransactionSection: boolean = false;
  mesTransactionSection: boolean = true;
  limit: number=10;
  offset: number=0;
  type = 'all';
  somme:number;
  listItems: Transaction[] = [];
  listItemsOfUser: Transaction[] = [];
  constructor(private storage: Storage, private authService: AuthService, private transactionService: TransactionService, private http: HttpClient) { }

  ngOnInit() {
    this.getUserInfos();
    this.transactionService.getTransactions(this.listItems, this.type, this.offset, this.limit);
    this.transactionService.getTransactions(this.listItemsOfUser, this.type, this.offset, this.limit, this.authService.currentUserSubject.value["telephone"]);
  }

  async getUserInfos(){
    const currentUser = this.authService.currentUserSubject.value;
    console.log(currentUser["roles"]);
    if((currentUser["roles"]).indexOf('ROLE_ADMIN_AGENCE')!=-1){
      this.is_shownAllTransaction = true;
    }
    if((currentUser["roles"]).indexOf('ROLE_Thu')!=-1){
      this.is_shownMesTransaction = true;
    }

  }

  showMesTransactions(){
    this.mesTransactionSection = true;
    this.allTransactionSection = false;
  }

  showAllTransactions(){
    this.allTransactionSection = true;
    this.mesTransactionSection = false;
  }

  // getUsers(){
  //   const url = environment.apiUrl+'/theusers';
  //   this.http.get<any[]>(url).subscribe(
  //     (data) => console.group(data)
  //   )
  // }

  // getSomme(){
  //   this.somme = this.transactionService.calculateCount(this.listItemsOfUser);
  // }

}

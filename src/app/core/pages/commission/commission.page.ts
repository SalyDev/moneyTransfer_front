import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { combineAll, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transaction } from '../../interfaces/Transaction';
import { TransactionService } from '../../services/transaction.service';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  test = new Subject();
  observable = new Observable
  sum: number;
  constructor(private transactionService: TransactionService, private http: HttpClient, private datePipe: DatePipe, private utilesService: UtilesService) {
   }
  ngOnInit() {
    this.getTransactions(this.type, 0, 10);
    console.log(this.listItems);
    // this.sum = this.transactionService.calculateCount(this.listItems);
  }

  nom = "wallet";
  titre = "Mes commissions";
  listItems:Transaction[] = [];
  initialValues: Transaction[];
  start: Date;
  end: Date;
  type: string="all";
  limit: number=10;
  offset: number=0;

  // on recupere les transactions
  getTransactions(type: string,offset: number, limit: number){
    const url = environment.apiUrl +'/agence/transactions/?type='+type+'&offset='+offset+'&limit='+limit;
    this.http.get<Transaction[]>(url).subscribe(
      (data) => {
        data.forEach(element => {
              this.listItems.push(element)
        });
        
      }
    )
    // this.sum = this.transactionService.calculateCount(this.listItems);
    this.initialValues = this.listItems;
    return this.listItems;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.offset = this.offset+this.limit;
      this.getTransactions(this.type,this.offset, this.limit);
      event.target.complete();
    }, 1000);
  }




  dateChanged(){
    if(this.end > this.start){
    this.listItems = this.initialValues.filter(item => ((item.date > this.start) && (item.date < this.end )))
    }
  }

  onInitialize(){
    this.listItems = [];
    this.getTransactions(this.type, 0, 10);
  }

}


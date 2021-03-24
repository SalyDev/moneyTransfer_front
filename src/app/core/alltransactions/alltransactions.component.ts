import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../interfaces/Transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.scss'],
})
export class AlltransactionsComponent implements OnInit {
  @Input() listItems: Transaction[];
  constructor(private http: HttpClient, private transactionSerivce: TransactionService) { }
  ngOnInit() {
  }
  nom = "wallet";
  titre = "Mes commissions";
  initialValues: Transaction[];
  start: Date;
  end: Date;
  type: string= "all";
  limit: number=10;
  offset: number=0;

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.offset = this.offset+this.limit;
      this.initialValues = this.transactionSerivce.getTransactions(this.listItems,this.type,this.offset, this.limit);
      event.target.complete();
    }, 1000);
  }

  dateChanged(){
    console.log("date change");
    if(this.end > this.start){
    this.listItems = this.initialValues.filter(item => ((item.date > this.start) && (item.date < this.end )))
    }
  }

  onInitialize(){
    this.listItems = [];
    this.initialValues = this.transactionSerivce.getTransactions(this.listItems, this.type, 0, 10);
  }
}

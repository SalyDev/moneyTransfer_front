import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../interfaces/Transaction';
import { AuthService } from '../services/auth.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-mestransactions',
  templateUrl: './mestransactions.component.html',
  styleUrls: ['./mestransactions.component.scss'],
})
export class MestransactionsComponent implements OnInit {

  constructor(private transactionSerivce: TransactionService, private authService: AuthService) { }
  @Input() listItemsOfUser: Transaction[];
  ngOnInit() {}

  initialValues: Transaction[];
  start: Date;
  end: Date;
  type: string= "all";
  limit: number=10;
  offset: number=0;
  somme: number;

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.offset = this.offset+this.limit;
      this.initialValues = this.transactionSerivce.getTransactions(this.listItemsOfUser,this.type,this.offset, this.limit, this.authService.currentUserSubject.value["telephone"]);
      event.target.complete();
    }, 1000);
  }

  dateChanged(){
    console.log("date change");
    if(this.end > this.start){
    this.listItemsOfUser = this.initialValues.filter(item => ((item.date > this.start) && (item.date < this.end )))
    }
  }

  onInitialize(){
    this.listItemsOfUser = [];
    this.initialValues = this.transactionSerivce.getTransactions(this.listItemsOfUser, this.type, 0, 10, this.authService.currentUserSubject.value["telephone"]);
  }

}

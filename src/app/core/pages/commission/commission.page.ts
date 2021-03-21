import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
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


  constructor(private transactionService: TransactionService, private http: HttpClient, private datePipe: DatePipe, private utilesService: UtilesService) { }
  ngOnInit() {
    this.getCommissions();
    this.showCommissions();
  }
  nom = "wallet";
  titre = "Mes commissions";
  depots: Transaction[];
  retraits: Transaction[];
  initialDepotValues: Transaction[];
  initialRetraitValues: Transaction[];
  start: Date;
  end: Date;
  type: string= "depot";
  // commissionBehaviorSubject: BehaviorSubject<Transaction> = new BehaviorSubject<Transaction>(null);
  getCommissions(): any{
    const url = environment.apiUrl + '/agence/transactions';
    this.http.get<Transaction>(url).
    subscribe(
      (data) => {
          this.utilesService.commissionBehaviorSubject.next(data);
      }
    )
  }

  showCommissions(){
    this.utilesService.commissionBehaviorSubject.subscribe(
      (data) => {
        console.log(data);
        if(data){
          this.depots = data["depot"];
          this.retraits = data["retrait"]
          this.initialDepotValues = data["depot"];
          this.initialRetraitValues = this.retraits;
        }
         
      }
    )
  }
  dateChanged(){
    if(this.end > this.start){
    this.depots = this.initialDepotValues.filter(item => ((item.date > this.start) && (item.date < this.end )))
    this.retraits = this.initialRetraitValues.filter(item => ((item.date > this.start) && (item.date < this.end )))
    }
  }

}


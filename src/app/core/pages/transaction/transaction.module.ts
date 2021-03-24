import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import { MestransactionsComponent } from '../../mestransactions/mestransactions.component';
import { AlltransactionsComponent } from '../../alltransactions/alltransactions.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPageRoutingModule,
    PipesModule
  ],
  declarations: [TransactionPage, MestransactionsComponent, AlltransactionsComponent]
})
export class TransactionPageModule {}

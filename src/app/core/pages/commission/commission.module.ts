import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommissionPageRoutingModule } from './commission-routing.module';

import { CommissionPage } from './commission.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommissionPageRoutingModule,
    SharedModule,
    PipesModule
  ],
  declarations: [CommissionPage]
})
export class CommissionPageModule {}

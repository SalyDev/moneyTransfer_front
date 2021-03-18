import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionPageModule)
      },
      {
        path: 'commission',
        loadChildren: () => import('../commission/commission.module').then(m => m.CommissionPageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

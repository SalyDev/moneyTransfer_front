import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helpers/auth.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        data:{
          'role': 'ROLE_USER'
        },
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'transaction',
        canActivate: [AuthGuard],
        data:{
          'role': 'ROLE_USER'
        },
        loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionPageModule)
      },
      {
        path: 'commission',
        canActivate: [AuthGuard],
        data:{
          'role': 'ROLE_ADMIN_AGENCE'
        },
        loadChildren: () => import('../commission/commission.module').then(m => m.CommissionPageModule)
      },
      {
        path: 'calculator',
        canActivate: [AuthGuard],
        data:{
          'role': 'ROLE_USER'
        },
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

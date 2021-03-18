import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'

  },
  {
    path: 'login',
    loadChildren: () => import('./core/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./core/pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./core/pages/depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./core/pages/retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./core/pages/unauthorized/unauthorized.module').then( m => m.UnauthorizedPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

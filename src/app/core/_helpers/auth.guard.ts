import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { UtilesService } from '../services/utiles.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private utilesService: UtilesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUser(route, url);
  }

  async checkUser(route: ActivatedRouteSnapshot, url: any): Promise<boolean> {
    await this.storage.create();
    // on recupere le user du ionic storage
    const currentUser = await this.storage.get('currentUser');
    if (currentUser) {
      const roleUser = currentUser['roles'];
      if (route.data.role && roleUser.indexOf(route.data.role) === -1) {
        console.log('contient pas');
        this.router.navigate(['tabs/home']);
        
        return false;
      } else {
        console.log('contient');
        // if(roleUser[0]=="ROLE_ADMIN_AGENCE"){
          // console.log('admin');
          // if(route.data.indice && route.data.indice=="commission"){
          //   console.log("commission");
          //   this.utilesService.getInitialTransactions("depot", 0, 10);
          // }
        // }
        return true;
        
      }
    } else {
      this.router.navigate(['/login']);
      console.log('not conected');
      return false;
    }
  }
}

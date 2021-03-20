import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     let url: string = state.url;
  //     // return this.checkUser(next, url);
  //     return true;
  // }
  constructor(private authService: AuthService, private storage: Storage, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUser(route, url);
    // return true;
  }

  checkUser(route: ActivatedRouteSnapshot, url: any): boolean | Promise<boolean> {
    this.storage.create();
    console.log(this.authService.currentUserSubject.value);
    if(this.authService.currentUserSubject.value){
      // console.log(this.authService.currentUserSubject.value);
      return this.storage.get('role').then<boolean>(
        (roleUser) =>{
          console.log(route.data.role);
          console.log(roleUser[0]);
          if(route.data.role && roleUser.indexOf(route.data.role)===-1){
            // console.log(route.data.role)
            console.log("contient pas");
            this.router.navigate(['tabs/home']);
            // retour = false;
            return false;
          }
          else{
            console.log("contient");
            // retour = true
            return true;
          }
        }
      )
    }
    else{
      this.router.navigate(['/login']);
      console.log("not conected");
      return false;
    }
  }
}

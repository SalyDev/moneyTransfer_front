import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.apiUrl+'/login';
  currentUser: Observable<User | boolean>;
  public currentUserSubject: BehaviorSubject<User>;


  constructor(private http: HttpClient, private storage: Storage, private router: Router) {
    this.getCurrentUser();
  }

  async getCurrentUser(){
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  // fonction pour la connexion
   getConnected(telephone: string, password: string):Observable<any>{
    return this.http.post(this.loginUrl, 
      {
        "telephone": telephone,
        "password": password
      }
      )
      .pipe(map(async user => {
        this.currentUserSubject.next(user);
        await this.storage.create();
        await this.storage.set('currentUser', user);
      }));
  }

  // fonction pour la deconnexion
  async loggout(){
    // on supprime les donnees du ionic storage
    await this.storage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  // fonction qui permet de recuperer le role dans le ionic storage
  // getRole(){
  //   this.storage.get('role').then(
  //     (roles)=>{
  //       return roles;
  //     }
  //   )
  // }
}

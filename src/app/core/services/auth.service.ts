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
    // on a besoin du user connecté s'il y' a en pour l'initialiser au behavior sUbject 
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // fonction pour la connexion
  getConnected(telephone: string, password: string):Observable<any>{
    return this.http.post(this.loginUrl, 
      {
        "telephone": telephone,
        "password": password
      }
      )
      .pipe(map(user =>  {
        // console.log(user);
        this.currentUserSubject.next(user);
        this.storage.create();
        this.storage.set('token', user["token"]);
        this.storage.set('role', user["roles"]);
      }));
  }

  // fonction pour la deconnexion
  loggout(){
    // on supprime les donnees du ionic storage
    this.storage.remove('token');
    this.storage.remove('role');

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

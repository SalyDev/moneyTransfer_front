import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.apiUrl+'/login';
  currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private storage: Storage) { 
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // fonction pour la connexion
  getConnected(telephone: string, password: string):Observable<any>{
    return this.http.post(this.loginUrl, 
      {
        "telephone": telephone,
        "password": password
      }
      ).pipe(map(user =>  {
        this.storage.create();
        this.storage.remove('currentUser');
        this.storage.set('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
}

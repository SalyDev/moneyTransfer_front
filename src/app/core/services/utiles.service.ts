import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {
  public solde : BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private toastController: ToastController, private http: HttpClient, private alertController: AlertController) { }

  // fonction pour monter un toast
  async showToast(message: string) 
  {
    const toast = await this.toastController.create({
      cssClass: 'custom_toast',
      message: message,
      duration: 5000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

  async showAlert(header:string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      // subHeader: 'Subtitle for alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // fonction pour un hhtp post
  // post(url:string, body: any): Observable<any>{
  //   return this.http.post<any>(url, body);
  // }

  // get(url:string): Observable<any[]>{
  //   return this.http.get<any[]>(url);
  // }
  
}

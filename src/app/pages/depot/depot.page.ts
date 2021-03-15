import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  isShowEmetter = true;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  nom = "arrow-redo";
  titre = "Dépot";

  showEmetter(){
    this.isShowEmetter = true;
  }

  showReceiver(){
    this.isShowEmetter = false;
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      cssClass: 'my-custom-class',
      message: 
      '<div>ÉMETTEUR</div><div class="customText">'+this.isShowEmetter+'</div><div>TÉLÉPHONE</div><div class="customText">'+this.isShowEmetter+'</div><div>N. CNI</div><div class="customText">'+this.isShowEmetter+'</div><div>MONTANT</div><div class="customText">'+this.isShowEmetter+'</div><div>RÉCEPTEUR</div><div class="customText">'+this.isShowEmetter+'</div><div>TÉLÉPHONE RÉCEPTEUR</div><div class="customText">'+this.isShowEmetter+'</div>',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert_custom_CancelBtn',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'Confirmer',
          cssClass: 'alert_custom_ConfimBtn',
          handler: () => {
            // this.showAlert();
            // au lieu d'une alerte on met une notification
          }
        }
      ]
    });
    await alert.present();
  }

  // async showAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     cssClass:'my-custom-class',
  //     subHeader: 'Subtitle for alert',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

}

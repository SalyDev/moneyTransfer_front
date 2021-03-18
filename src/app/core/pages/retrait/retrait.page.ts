import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  nom = "arrow-undo";
  titre = "Retrait";
  isShowReceiver = true;

  showEmetter(){
    this.isShowReceiver = false;
  }

  showReceiver(){
    this.isShowReceiver = true;
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      cssClass: 'my-custom-class',
      message: 
      '<div>BÉNÉFICIAIRE</div><div class="customText">'+this.isShowReceiver+'</div><div>TÉLÉPHONE</div><div class="customText">'+this.isShowReceiver+'</div><div>N. CNI</div><div class="customText">'+this.isShowReceiver+'</div><div>MONTANT REÇU</div><div class="customText">'+this.isShowReceiver+'</div><div>ÉMETTEUR</div><div class="customText">'+this.isShowReceiver+'</div><div>TÉLÉPHONE</div><div class="customText">'+this.isShowReceiver+'</div>',
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

}

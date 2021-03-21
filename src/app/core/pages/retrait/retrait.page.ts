import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Client } from '../../interfaces/Client';
import { Transaction } from '../../interfaces/Transaction';
import { PopoverComponent } from '../../popover/popover.component';
import { TransactionService } from '../../services/transaction.service';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private transactionService: TransactionService,
    private http: HttpClient,
    private popoverController: PopoverController,
    private router: Router,
    private utilesService: UtilesService
  ) {}

  ngOnInit() {}
  numeroCni: string;
  nom = 'arrow-undo';
  titre = 'Retrait';
  isShowReceiver = true;
  showTransactionDetail: boolean = false;
  emetter: Client = {};
  receiver: Client = {};
  transaction: Transaction = {};

  showEmetter() {
    this.isShowReceiver = false;
  }

  showReceiver() {
    this.isShowReceiver = true;
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      cssClass: 'my-custom-class',
      message:
        '<div>BÉNÉFICIAIRE</div><div class="customText">' +
        this.receiver.prenom +
        ' ' +
        this.receiver.nom +
        '</div><div>TÉLÉPHONE</div><div class="customText">' +
        this.receiver.telephone +
        '</div><div>N. CNI</div><div class="customText">' +
        this.isShowReceiver +
        '</div><div>MONTANT REÇU</div><div class="customText">' +
        this.transaction.montant +
        '</div><div>ÉMETTEUR</div><div class="customText">' +
        this.emetter.prenom +
        ' ' +
        this.emetter.nom +
        '</div><div>TÉLÉPHONE</div><div class="customText">' +
        this.emetter.telephone +
        '</div>',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert_custom_CancelBtn',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmer',
          cssClass: 'alert_custom_ConfimBtn',
          handler: () => {
            //confirmation du retrait
            this.onRetrait();
          },
        },
      ],
    });
    await alert.present();
  }

  onRetrait() {
    if (this.transaction.date_retrait) {
      console.log(this.transaction.date_retrait);
      this.presentPopover('Le retrait à été déjà effectue');
    } else {
      this.transaction.type = 'retrait';
      this.transaction.client_retrait.numero_cni = this.numeroCni;
      const url = environment.apiUrl + '/transactions';
      this.http.post<Transaction>(url, this.transaction)
      .subscribe(
        (data) => {
          this.presentPopover('Le retrait à été effectué avec succès');
          // on reinitialise le solde du compte
          this.utilesService.solde.next(data["user_agence_depot"]["agence"]["compte"]["solde"]);
        }
      );
    }
  }

  getTransactionInfos(form: NgForm) {
    let code = form.controls.code.value;
    const url = environment.apiUrl + '/transactions/?code=' + code;
    if (code == '0' || code == '') {
      return;
    }
    // on recupere la transaction correspondant à ce code
    this.http.get<Transaction[]>(url).subscribe(
      (data) => {
        if (data.length == 0) {
          this.showTransactionDetail = false;
          this.receiver = this.emetter = { nom: '', prenom: '', telephone: '' };
          this.transaction = { montant: '', date_depot: new Date('') };
        } else {
          this.showTransactionDetail = true;
          this.receiver = {
            id: data[0]['client_retrait']['id'],
            nom: data[0]['client_retrait']['nom'],
            prenom: data[0]['client_retrait']['prenom'],
            telephone: data[0]['client_retrait']['telephone'],
          };
          this.emetter = {
            nom: data[0]['client_depot']['nom'],
            prenom: data[0]['client_depot']['prenom'],
            telephone: data[0]['client_depot']['telephone'],
            numero_cni: data[0]['client_depot']['numero_cni'],
          };
          this.transaction = data[0];
        }
      },
      () => (this.showTransactionDetail = false)
    );
  }

  async presentPopover(message: string) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      translucent: true,
      componentProps: {
        message: message,
      },
    });
    return await popover.present();
  }
}

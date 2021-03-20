import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  PopoverController,
} from '@ionic/angular';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UtilesService } from 'src/app/core/services/utiles.service';
import { environment } from 'src/environments/environment';
import { Transaction } from '../../interfaces/Transaction';
import { PopoverComponent } from '../../popover/popover.component';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  isShowEmetter: boolean = true;
  depotForm: FormGroup;
  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private utilesService: UtilesService,
    private transactionService: TransactionService,
    private popoverController: PopoverController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  async presentPopover(nom: string, date: Date, code: string) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        nom: nom,
        date: date,
        code: code,
        type: 'depot',
      },
    });
    return await popover.present();
  }

  nom = 'arrow-redo';
  titre = 'Dépot';

  showEmetter() {
    this.isShowEmetter = true;
  }

  showReceiver() {
    this.isShowEmetter = false;
  }

  async onSubmit() {
    if (this.depotForm.invalid) {
      this.utilesService.showToast("Valider tous les champs d'abord");
    } else {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        cssClass: 'my-custom-class',
        message:
          '<div>ÉMETTEUR</div><div class="customText">' +
          this.depotForm.get('emetterPrenom').value +
          ' ' +
          this.depotForm.get('emetterNom').value +
          '</div><div>TÉLÉPHONE</div><div class="customText">' +
          this.depotForm.get('emetterTelephone').value +
          '</div><div>N. CNI</div><div class="customText">' +
          this.depotForm.get('emetterCni').value +
          '</div><div>MONTANT</div><div class="customText">' +
          this.depotForm.get('montant').value +
          '</div><div>RÉCEPTEUR</div><div class="customText">' +
          this.depotForm.get('receiverPrenom').value +
          ' ' +
          this.depotForm.get('receiverNom').value +
          '</div><div>TÉLÉPHONE RÉCEPTEUR</div><div class="customText">' +
          this.depotForm.get('receiverTelephone').value +
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
              let transaction: Transaction;
              transaction = {
                type: 'depot',
                montant: this.depotForm.get('montant').value,
                client_depot: {
                  nom: this.depotForm.get('emetterNom').value,
                  prenom: this.depotForm.get('emetterPrenom').value,
                  numero_cni: this.depotForm.get('emetterCni').value,
                  telephone: this.depotForm.get('emetterTelephone').value,
                },
                client_retrait: {
                  nom: this.depotForm.get('receiverNom').value,
                  prenom: this.depotForm.get('receiverPrenom').value,
                  telephone: this.depotForm.get('receiverTelephone').value,
                },
              };
              this.transactionService
                .doTransaction(transaction)
                .subscribe((data) => {
                  let nom =
                    this.depotForm.get('receiverPrenom').value +
                    ' ' +
                    this.depotForm.get('receiverNom').value;
                  this.presentPopover(nom, data['date_depot'], data['code']);
                  // on reinitialise le solde du compte
                  this.utilesService.solde.next(data["user_agence_depot"]["agence"]["compte"]["solde"]);
                });
            },
          },
        ],
      });
      await alert.present();
    }
  }

  initForm() {
    this.depotForm = this.formBuilder.group({
      emetterCni: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
      emetterNom: ['', Validators.required],
      emetterPrenom: ['', Validators.required],
      emetterTelephone: ['', [Validators.required, Validators.pattern(/^(77|76|75|78|70)[0-9]{7}$/)]],
      montant: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      frais: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      total: ['', Validators.required],
      receiverPrenom: ['', Validators.required],
      receiverNom: ['', Validators.required],
      receiverTelephone: ['', [Validators.required, Validators.pattern(/^(77|76|75|78|70)[0-9]{7}$/)]],
    });
  }

  findClient(){
    let num_cni = this.depotForm.get('emetterCni').value;
    const clientUrl = environment.apiUrl + '/getclients?cni=' + num_cni;
    this.http.get(clientUrl).subscribe((data) => {
      if(data!=null){
        this.depotForm.get('emetterNom').setValue(data['nom']);
        this.depotForm.get('emetterPrenom').setValue(data['prenom']);
        this.depotForm.get('emetterTelephone').setValue(data['telephone']);
      }
      
    });
  }

  setTotal() {
    if (
      this.depotForm.get('montant').value &&
      this.depotForm.get('frais').value
    ) {
      this.depotForm
        .get('total')
        .setValue(
          +this.depotForm.get('montant').value +
            +this.depotForm.get('frais').value
        );
    }
  }
}

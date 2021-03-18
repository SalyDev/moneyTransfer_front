import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { UtilesService } from 'src/app/core/services/utiles.service';
import { environment } from 'src/environments/environment';
import { PopoverComponent } from '../../popover/popover.component';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  isShowEmetter: boolean = true;
  depotForm: FormGroup;
  constructor(private alertController: AlertController, private formBuilder: FormBuilder, private utilesService: UtilesService, private transactionService: TransactionService, private popoverController: PopoverController, private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  async presentPopover(nom: string, date: Date, code: string) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        "nom": nom,
        "date": date,
        "code": code
      }
    });
    return await popover.present();
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
    if(this.depotForm.invalid){
      this.utilesService.showToast("Valider tous les champs d'abord");
    }
    else{
    const alert = await this.alertController.create({
      header: 'Confirmation',
      cssClass: 'my-custom-class',
      message: 
      '<div>ÉMETTEUR</div><div class="customText">'+this.depotForm.get('emetterPrenom').value+' '+this.depotForm.get('emetterNom').value+'</div><div>TÉLÉPHONE</div><div class="customText">'+this.depotForm.get('emetterTelephone').value+'</div><div>N. CNI</div><div class="customText">'+this.depotForm.get('emetterCni').value+'</div><div>MONTANT</div><div class="customText">'+this.depotForm.get('montant').value+'</div><div>RÉCEPTEUR</div><div class="customText">'+this.depotForm.get('receiverPrenom').value+' '+this.depotForm.get('receiverNom').value+'</div><div>TÉLÉPHONE RÉCEPTEUR</div><div class="customText">'+this.depotForm.get('receiverTelephone').value+'</div>',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'alert_custom_CancelBtn',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Confirmer',
          cssClass: 'alert_custom_ConfimBtn',
          handler: () => {
            this.transactionService.doTransaction(
              "depot", this.depotForm.get('montant').value, this.depotForm.get('frais').value, this.depotForm.get('emetterNom').value, this.depotForm.get('emetterPrenom').value, this.depotForm.get('emetterCni').value, this.depotForm.get('emetterTelephone').value, this.depotForm.get('receiverNom').value, this.depotForm.get('receiverPrenom').value, this.depotForm.get('receiverTelephone').value
            ).subscribe(
              (data) => {
                let nom = this.depotForm.get("receiverPrenom").value + ' ' + this.depotForm.get("receiverNom").value;
                this.presentPopover(nom, data["date_depot"], data["code"]);
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }
  }

  initForm(){
    this.depotForm = this.formBuilder.group({
      "emetterCni": ["", Validators.required],
      "emetterNom": ["", Validators.required],
      "emetterPrenom": ["", Validators.required],
      "emetterTelephone": ["", Validators.required],
      "montant": ["", Validators.required],
      "frais":["", Validators.required],
      "total": ["", Validators.required],
      "receiverPrenom": ["", Validators.required],
      "receiverNom": ["", Validators.required],
      "receiverTelephone": ["", Validators.required]
    })
  }

  findClient(){
    let num_cni = this.depotForm.get("emetterCni").value;
    const clientUrl = environment.apiUrl+'/getclients?cni='+num_cni;
    this.http.get(clientUrl).subscribe(
      (data)=> {
        this.depotForm.get('emetterNom').setValue(data["nom"])
        this.depotForm.get('emetterPrenom').setValue(data["prenom"]);
        this.depotForm.get('emetterTelephone').setValue(data["telephone"]);
      }
    )

  }

  setTotal(){
    if(this.depotForm.get('montant').value && this.depotForm.get('frais').value){
      this.depotForm.get('total').setValue(+this.depotForm.get('montant').value + (+this.depotForm.get('frais').value));
    }
  }
}

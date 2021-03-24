import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  toggleIcon: string = "eye-off";
  showMount: boolean = false;
  avatar: string = '';
  count: string = '';
  currentUser: string;
  essai: string;
  role:string;
  constructor(private storage: Storage, private authService: AuthService, private utilesService: UtilesService) { }

  ngOnInit() {
    this.getData();

    // this.utilesService.commissionBehaviorSubject.next([{frais:'100'}]);
    // console.log('hey');
  }

  getData(){
    this.authService.currentUser.subscribe(
      (donnee) => {
        if(donnee){
          this.avatar = donnee["avatar"];
          this.utilesService.solde.next(donnee["solde"]);
          this.updateSolde();
        }
      }
    )
  }

  updateSolde(){
    this.utilesService.solde.subscribe(
      (solde) => this.count = solde
    )
  }

  toggleText(){
    this.showMount = !this.showMount;
    if(this.toggleIcon=="eye-off"){
      this.toggleIcon = "eye";
    }
    else{
      this.toggleIcon = "eye-off";
    }
  }

  // fonction pour la deconnexion
  onDeconnect(){
    this.authService.loggout();
  }
}

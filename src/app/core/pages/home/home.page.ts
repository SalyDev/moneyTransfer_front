import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  toggleIcon: string = "eye-off";
  showMount: boolean = false;
  avatar: string = '';
  solde: string = '';
  currentUser: string;
  essai: string;
  constructor(private storage: Storage, private authService: AuthService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.authService.currentUser.subscribe(
      (donnee) => {
        this.avatar = donnee["avatar"];
      }
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
}

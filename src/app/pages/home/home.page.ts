import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  toggleIcon = "eye-off";
  showMount = false;
  constructor() { }

  ngOnInit() {
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

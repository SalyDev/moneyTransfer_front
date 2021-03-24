import { Component, OnInit } from '@angular/core';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private utilesService: UtilesService) { }

  ngOnInit() {

  }

}

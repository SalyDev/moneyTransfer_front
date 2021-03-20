import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UtilesService } from '../../services/utiles.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  nom: string = "calculator";
  titre: string = "Calculateur";
  type: string = "depot";
  url: string = environment.apiUrl + "/calculator";
  constructor(private http: HttpClient, private utilesService: UtilesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form.controls.montant.value);
    console.log(this.type);
    const body = {
      "type": this.type,
      "montant": form.controls.montant.value
    };
    this.http.post<string>(this.url, body).subscribe(
      (result)=>{
        const message = 'Pour une transaction de '+ form.controls.montant.value+' les frais sont égals à '+ '<h1>'+result+' FCFA </h1>'
        this.utilesService.showAlert("Calculateur", message)
      }
    );
  }


}

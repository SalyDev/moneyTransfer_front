import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilesService } from 'src/app//core/services/utiles.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  is_shownErrorMsg: boolean = false;
  iconName: string = 'eye-off';
  inputType: string = 'password';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilesService: UtilesService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.initForm();
    this.storage.create();
    console.log(this.storage.get('token'));
  }

  onSubmit() {
    this.router.navigate(['tabs/home']);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      telephone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmitForm() {
    if (this.loginForm.valid) {
      this.authService
        .getConnected(
          this.loginForm.get('telephone').value,
          this.loginForm.get('password').value
        )
        .subscribe(
          (user) => {
            // console.log(data);
            this.router.navigate(['/tabs/home']);
            // this.authService.currentUserSubject.next(user);
          },
          () => {
            this.utilesService.showToast('Login ou mot de passe incorrecte.');
          }
        );
    }
  }
  
  iconToggler(){
    if(this.iconName == 'eye'){
      this.iconName = 'eye-off';
      this.inputType = 'password';
    }
    else{
      this.iconName = 'eye';
      this.inputType = 'text';
    }
  }
}

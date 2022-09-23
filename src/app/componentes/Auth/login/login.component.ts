import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { credentials } from 'src/app/Models/api-models/Auth/credentials.model';
import { LoginService } from 'src/app/services/Auth/login.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  credential: credentials = {
    userName: '',
    password: ''
  }
  public token: string | undefined;

  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  contra = new FormControl('', [Validators.required]);
  hide = true;
  public cookieUser : string = '';
  public userJson : any = '';

  constructor(
    private readonly loginService: LoginService,
    private snackbar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private readonly spinnerService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.cookieUser = this.cookieService.get('accessToken');
    if(this.cookieUser){
      this.userJson = this.getDecodedAccessToken(this.cookieUser);
      if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Usuario'){
        this.router.navigate(['usuario']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Administrador'){
        this.router.navigate(['administrador']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Tutor'){
        this.router.navigate(['entrenador']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Ventas'){
        this.router.navigate(['panel-ventas']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Gimnasio'){
        this.router.navigate(['panel-gimnasio']);
      }
    }
  }

  getDecodedAccessToken(accessToken: string): any {
    try {
      return jwt_decode(accessToken);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email requerido';
    }
    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  login(){
    this.spinnerService.show();
    if(this.studentDetailsForm?.form.valid){
      this.loginService.login(this.credential)
      .subscribe(
        (successResponse)=>{
          this.spinnerService.hide();
          localStorage.setItem('vista', 'inicio');
          this.snackbar.open('Inicio de sesion exitoso',undefined,{
            duration: 2000
          });
          this.cookieService.set('accessToken', successResponse.accessToken);
          this.cookieService.set('refreshToken', successResponse.refreshToken);

          var role:any = jwt_decode(successResponse.accessToken);
          console.log(role);
          if(role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Usuario'){
            this.router.navigateByUrl(`/usuario`)
            .then(() => {
              window.location.reload();
            });;
          }
          else if(role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Tutor'){
            this.router.navigateByUrl(`/entrenador`)
            .then(() => {
              window.location.reload();
            });;
          }
          else if(role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Administrador'){
            this.router.navigateByUrl(`/administrador`)
            .then(() => {
              window.location.reload();
            });;
          }
          else if(role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Ventas'){
            this.router.navigateByUrl(`/panel-ventas`)
            .then(() => {
              window.location.reload();
            });;
          }
          else if(role["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Gimnasio'){
            this.router.navigateByUrl(`/panel-gimnasio`)
            .then(() => {
              window.location.reload();
            });;
          }
        },
        (error) =>{
          this.spinnerService.hide();
          this.snackbar.open('Error iniciando sesion, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }
}

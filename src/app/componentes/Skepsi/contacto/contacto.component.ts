import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SkepsiService } from 'src/app/services/skepsi.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    comentarios: new FormControl('',Validators.required),
  });
  public cookieUser : string = '';
  public userJson : any = '';

  constructor(
    private skepsiService:SkepsiService,
    private cookieService : CookieService,
    private snackbar: MatSnackBar,
    private readonly spinnerService: SpinnerService,
    private router: Router
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

  sendData(form:any){
    this.spinnerService.show();
    const data = {
      name: form.value.nombre,
      phoneNumber: form.value.telefono,
      email: form.value.email,
      comments: form.value.comentarios,
      sourceArea: 'Contactanos'
    }
    this.skepsiService.addMessage(data)
    .subscribe(
      (success)=>{
        this.spinnerService.hide();
        this.snackbar.open('Información enviada correctamente.',undefined,{
          duration: 2000
        });
      },
      (error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )
  }
}

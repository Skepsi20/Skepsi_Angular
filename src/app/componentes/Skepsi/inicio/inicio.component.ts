import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SkepsiService } from 'src/app/services/skepsi.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
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
    private snackbar: MatSnackBar,
    private cookieService : CookieService,
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
    }else{
      if (!localStorage.getItem('foo')) {
        localStorage.setItem('foo', 'no reload')
        location.reload()
      } else {
        localStorage.removeItem('foo')
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
        this.snackbar.open('Información enviada correctamente.',undefined,{
          duration: 2000
        });
        console.log(success)
      },
      (error)=>{
        console.log(error)
      }
    )
  }
}

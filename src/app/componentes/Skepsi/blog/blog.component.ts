import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: '*', opacity: 1 }))
          ]),
        transition(':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('1s ease-in', style({ height: 0, opacity: 0 }))
          ])
      ]
    )
  ]
})
export class BlogComponent implements OnInit {
  imagenUnoSeleccionada = false;
  imagenDosSeleccionada = false;
  imagenTresSeleccionada = false;
  public cookieUser : string = '';
  public userJson : any = '';


  constructor(
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
    }
  }

  getDecodedAccessToken(accessToken: string): any {
    try {
      return jwt_decode(accessToken);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }

  mostrarTexto(texto:number){
    switch(texto){
      case 1:
        this.imagenDosSeleccionada = false;
        this.imagenTresSeleccionada = false;
        this.imagenUnoSeleccionada = !this.imagenUnoSeleccionada;
      break;
      case 2:
        this.imagenUnoSeleccionada = false;
        this.imagenTresSeleccionada = false;
        this.imagenDosSeleccionada = !this.imagenDosSeleccionada;
      break;
      case 3:
        this.imagenUnoSeleccionada = false;
        this.imagenDosSeleccionada = false;
        this.imagenTresSeleccionada = !this.imagenTresSeleccionada;
      break;
    }
  }

}

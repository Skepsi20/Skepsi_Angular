import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent implements OnInit {
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

}

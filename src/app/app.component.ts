import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Skepsi';
  mobHeight: any;
  mobWidth: any;
  mobile:any;
  completeMenu:any;

  showFiller = false;
  public cookieUser : string = '';
  public userJson : any = '';
  public userName: string = '';
  public role:any = [];

  constructor(
    private cookieService : CookieService,
    private router: Router,
  ) {
    this.mobHeight = (window.screen.height) ;
    this.mobWidth = (window.screen.width) ;
    if(this.mobWidth<960){
      this.completeMenu = false;
    }
    else{
      this.completeMenu = true;
    }
  }

  ngAfterViewChecked(): void {
    /* if(this.mobWidth < 960){
      var x = document.getElementById('contenedorTopNav');
      if(x!.className != 'topnav'){
        x!.className = "topnav";
      }
    } */
  }

  ngOnInit(): void {
    if((navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/i))){
      this.mobile = true;
    }else{
      this.mobile = false;
    }

    this.role = [];
    this.cookieUser = this.cookieService.get('accessToken');
    if(this.cookieUser){
      this.userJson = this.getDecodedAccessToken(this.cookieUser);
      console.log('user json' ,this.userJson);
      if(this.userJson.PersonName){
        this.userName = this.userJson.PersonName;
      }else{
        this.userName = 'SKEPSI ADMIN';
      }
      if(!Array.isArray(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])){
        this.role.push(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      }else{
        this.role = this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
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

  logOut(){
    this.cookieService.delete('accessToken');
    this.router.navigateByUrl(`/inicio`);
    window.location.reload();
  }

  myFunction(){
    console.log("Entre aqui")
    var x = document.getElementById('myTopnav');
    if(x != null){
      if(x.className === 'topnav'){
        x.className += " responsive";
      }else {
        x.className = "topnav";
      }
    }
  }



}

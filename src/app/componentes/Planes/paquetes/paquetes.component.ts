import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { paquete } from '../../../Models/api-models/Plans/paquete.model';
import { VentasService } from '../../../services/Planes/ventas.service';
import { CookieService } from 'ngx-cookie-service';
import { PaypalService } from 'src/app/services/paypal.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/Auth/student.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  public paquetes : Array<paquete> = [];
  public cookieUser : string = '';
  public userJson : any = '';
  public cookieDecoded : any = '';
  public userId: string = '';
  public usuarioSinPaquete: boolean = true;
  public botonesPayPal: boolean = false;
  public currentCourse: any;
  //public planId = 'P-6T174570PL473903SMK6JVJA';
  public planId = '';
  public role = '';
  public planDetailCurrentCourse: Array<string> = [];
  public terminos :Array<any> = [];

  constructor(
    private readonly ventasService: VentasService,
    private readonly sharedService: SharedService,
    private readonly studentService: StudentService,
    private readonly paypalService: PaypalService,
    private cookieService : CookieService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('accessToken');
    var tokenDecoded:any = jwt_decode(token);
    this.role = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.usuariosConPlan();
    if(this.role == 'Usuario'){
      console.log('entro aqui')
      this.getStudentPlans();
    }else{
      this.getAll();
    }
  }

  usuariosConPlan(){
    this.cookieUser = this.cookieService.get('accessToken');
    try {
      this.cookieDecoded = jwt_decode(this.cookieUser);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
    if(this.cookieDecoded.ActiveSubscription == 'False' || !this.cookieDecoded.ActiveSubscription){
      this.usuarioSinPaquete = false;
    }else{
      this.usuarioSinPaquete = true;
      this.ventasService.getPaqueteSuscrito()
      .subscribe(
        (success)=>{
          this.currentCourse = success;
          if(this.currentCourse.planDetail.onMonday == true){this.planDetailCurrentCourse.push('Lunes')}
          if(this.currentCourse.planDetail.onTuesday == true){this.planDetailCurrentCourse.push('Martes')}
          if(this.currentCourse.planDetail.onWednesday == true){this.planDetailCurrentCourse.push('Miércoles')}
          if(this.currentCourse.planDetail.onThursday == true){this.planDetailCurrentCourse.push('Jueves')}
          if(this.currentCourse.planDetail.onFriday == true){this.planDetailCurrentCourse.push('Viernes')}
          if(this.currentCourse.planDetail.onSaturday == true){this.planDetailCurrentCourse.push('Sábado')}
          if(this.currentCourse.planDetail.onSunday == true){this.planDetailCurrentCourse.push('Domingo')}
        },(error)=>{
          console.log(error);
        }
      )
    }
  }

  getAll(){
    this.ventasService.getAllPaquetes()
      .subscribe(
        (successResponse)=>{
          console.log("PAQUETES",successResponse)
          this.paquetes = successResponse;
        },
        (error) =>{
          console.log(error);
        }
    );
  }

  getStudentPlans(){
    this.ventasService.getAllPaquetesAvailable()
      .subscribe(
        (successResponse)=>{
          console.log("PAQUETES",successResponse)
          this.paquetes = successResponse;
        },
        (error) =>{
          console.log(error);
        }
    );
  }

  subscribeIfPaypal(planId: string,paypalPlan:string,index:number){
    console.log(planId, paypalPlan)
    if(paypalPlan != null){
      this.subscribeWithPaypal(index);
    }else{
      this.subscribe(planId)
    }
  }

  subscribeWithPaypal(index:number){
    this.paquetes[index].botonesPayPal = !this.paquetes[index].botonesPayPal;
  }

  subscribe(planId: string){
  const currentAccessToken = this.cookieService.get('accessToken')
  const currentRefreshToken = this.cookieService.get('refreshToken')
  const actualTokens = {
    accessToken:currentAccessToken,
    refreshToken:currentRefreshToken
  }
  const request = {
    externalId: undefined,
    externalType: undefined,
    planId: planId
  }
  this.paypalService.addSubscription(request)
  .subscribe(
    (success)=>{
      console.log("funciono la suscripcion")
      this.studentService.refreshToken(actualTokens)
      .subscribe(
        (success)=>{
          console.log('tokenActualizado')
          this.cookieService.set('accessToken', success.accessToken);
          this.cookieService.set('refreshToken', success.refreshToken);
          localStorage.setItem('vista', 'inicio');
          window.location.reload();
        },(error)=>{
          console.log(error);
        }
      )
    },(error)=>{
      console.log(error);
    }
  )
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../services/Planes/ventas.service';
import { CookieService } from 'ngx-cookie-service';
import { PaypalService } from 'src/app/services/paypal.service';
import jwt_decode from 'jwt-decode';
import { StudentService } from 'src/app/services/Auth/student.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  public paquetes : Array<any> = [];
  public cookieUser : string = '';
  public userJson : any = '';
  public cookieDecoded : any = '';
  public userId: string = '';
  public usuarioSinPaquete: boolean = true;
  public botonesPayPal: boolean = false;
  public currentCourse: any;
  //public planId = 'P-6T174570PL473903SMK6JVJA';
  public selectedGroup: string = '';
  public planId = '';
  public role = '';
  public planDetailCurrentCourse: Array<string> = [];
  public terminos :Array<any> = [];

  constructor(
    private readonly ventasService: VentasService,
    private readonly studentService: StudentService,
    private readonly paypalService: PaypalService,
    private cookieService : CookieService,
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('accessToken');
    var tokenDecoded:any = jwt_decode(token);
    this.role = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.usuariosConPlan();
    if(this.role == 'Usuario'){
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

  subscribeIfPaypal(group: string,paypalPlan:string,index:number){
    console.log(group, paypalPlan)
    if(paypalPlan != null){
      this.subscribeWithPaypal(index);
    }else{
      this.subscribe(group)
    }
  }

  subscribeWithPaypal(index:number){
    this.paquetes[index].botonesPayPal = !this.paquetes[index].botonesPayPal;
  }

  subscribe(group: string){
  const currentAccessToken = this.cookieService.get('accessToken')
  const currentRefreshToken = this.cookieService.get('refreshToken')
  const actualTokens = {
    accessToken:currentAccessToken,
    refreshToken:currentRefreshToken
  }
  const request = {
    externalId: undefined,
    externalType: undefined,
    groupId: group
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
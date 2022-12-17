import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PaypalService } from 'src/app/services/paypal.service';
import jwt_decode from 'jwt-decode';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/Auth/student.service';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @Input() planId:string = '';
  @Input() skepsiPlanId:string = '';
    public cookieUser : string = '';
    public userJson : any = '';
    public userId: string = '';


  //public planId:string = 'P-6T174570PL473903SMK6JVJA'

  constructor(
    private readonly paypalService: PaypalService,
    private readonly router: Router,
    private cookieService : CookieService,
    private readonly sharedService: SharedService,
    private readonly studentService: StudentService,
    private snackbar: MatSnackBar,
  ){}

  ngOnInit(): void {
    console.log("PLAN ID PAYPAL",this.planId)
    const planId = this.planId;
    const skepsiPlan = this.skepsiPlanId;

    paypal.Buttons({
      createSubscription: function(data:any, actions:any) {
        debugger
        return actions.subscription.create({
          'plan_id': planId // Creates the subscription
        });
      },
      onApprove: async (data:any, actions:any) =>{
        const currentAccessToken = this.cookieService.get('accessToken')
        const currentRefreshToken = this.cookieService.get('refreshToken')
        const actualTokens = {
          accessToken:currentAccessToken,
          refreshToken:currentRefreshToken
        }
        console.log("LA DATA ", data)
        const request = {
          externalId: data.subscriptionID,
          externalType: 'PayPal',
          groupId: this.skepsiPlanId
        }
        this.paypalService.addSubscription(request)
        .subscribe(
          (success)=>{
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
            console.log(success)
          },(error)=>{
            console.log(error)
          }
        )
      },
      onError: (err:any) =>{
        console.log(err)
      }
    }
    ).render(this.paypalElement.nativeElement);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }

  @ViewChild('paypal', {static:true}) paypalElement!: ElementRef;
}

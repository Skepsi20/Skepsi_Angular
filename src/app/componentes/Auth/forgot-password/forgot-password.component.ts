import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/Auth/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  constructor(
    private readonly authService: LoginService
  ) { }

  ngOnInit(): void {
  }

  sendEmail(){
    this.authService.forgotPassword(this.email)
    .subscribe(
      (success)=>{
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/Auth/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public paramsObject: any;
  public email = '';
  public token = '';
  public password = '';
  public passwordConfirm = '';
  hide = true;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly registerService: RegisterService,
    private snackbar: MatSnackBar,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
  .subscribe((params) => {
    this.paramsObject = { ...params.keys, ...params };
    console.log(this.paramsObject);
    this.email = this.paramsObject.params.email;
    this.token = this.paramsObject.params.token;
  }
  );
  }

  changePassword(){

    const data = {
      password: this.password,
      confirmPassword: this.passwordConfirm,
      email: this.email,
      token: this.token
    }

    this.registerService.forgotPassword(data)
    .subscribe(
      (success)=>{
        console.log(success);
        this.snackbar.open('Contraseña cambiada con éxito!',undefined,{
          duration: 2000
        });
        this.router.navigateByUrl(`/login`);
      },(error)=>{
        console.log(error);
      }
    )
  }

}

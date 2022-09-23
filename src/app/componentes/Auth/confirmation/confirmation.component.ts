import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegisterService } from 'src/app/services/Auth/register.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  public paramsObject: any;
  public email = '';
  public token = '';

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

  confirm(){
    const data = {
      email: this.email,
      token: this.token
    }
    this.registerService.confirmUser(data)
    .subscribe(
      (success)=>{
        console.log(success);
        this.snackbar.open('Correo confirmado correctamente.',undefined,{
          duration: 2000
        });
        this.router.navigateByUrl(`/`);
      },(error)=>{
        console.log(error);
      }
    )
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { addStudentRequest } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { RegisterService } from 'src/app/services/Auth/register.service';
import { InstitucionService } from 'src/app/services/Instituciones/institucion.service';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  privacidad = false;
  hide = true;
  studentId: string | null | undefined;
  estados :Array<any> = [];
  generos: Array<string> = ['Masculino','Femenino','Otro'];
  student: addStudentRequest = {
    student: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      institutionId: '',
      group: {
        id: '',
        code: '',
        planId: '',
        groupOfStudents: '',
        tutorId: ''
      },
      address: {
        city: '',
        StateProvinceCodeId: '',
        postalCode: '',
        line1: '',
        line2: ''
      },
      relative: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
      },
    },
    user:{
      email: '',
      password: '',
      phoneNumber: '',
    }
  }
  public errorMessage: Array<any> = [];
  public passwordConfirm = '';
  public cookieUser : string = '';
  public userJson : any = '';

  header = '';
  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;
  public institutions : Array<IInstitution> = [];

  constructor(
    private readonly RegisterService: RegisterService,
    private readonly institutionService: InstitucionService,
    private readonly registerService: RegisterService,
        private cookieService: CookieService,
    private snackbar: MatSnackBar,
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
    this.registerService.getStates()
    .subscribe(
      (success) => {
        console.log(success)
        this.estados = success;
      },(error)=>{
        console.log(error)
      }
    )
    this.getAll();
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email requerido';
    }
    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  omit_special_char(event: any){
    var ñ;
    ñ = event.charCode;
    return((ñ > 64 && ñ < 91) || (ñ > 96 && ñ < 123) || ñ == 8 || ñ == 32 || (ñ >= 48 && ñ <= 57));
  }

  getDecodedAccessToken(accessToken: string): any {
    try {
      return jwt_decode(accessToken);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }

  onAdd():void{
    this.errorMessage = [];
    if(this.studentDetailsForm?.form.valid){
      if(this.student.student.institutionId == ''){
        this.student.student.institutionId = null;
      }
      this.RegisterService.addStudent(this.student)
      .subscribe(
        (sucessResponse)=>{
          this.snackbar.open('Registro completado con éxito',undefined,{
            duration: 2000
          });
          setTimeout(()=>{
            this.router.navigateByUrl(`/emailConfirm`);
          }, 2000);
        },
        (error) =>{
          this.snackbar.open('Error creando cuenta, intente nuevamente.',undefined,{
            duration: 2000
          });
          if(error.error.DuplicateEmail){
            this.errorMessage.push('El correo de alumno '+this.student.user.email+'  ya está siendo utilizado.')
          }
          if(error.error.PasswordRequiresDigit){
            this.errorMessage.push('La contraseña debe tener al menos 1 dígito.')
          }
        }
      );
    }
  }

  getAll(){
    this.institutionService.getAll()
      .subscribe(
        (successResponse)=>{
          this.institutions = successResponse;
        },
        (error) =>{
          console.log(error)
        }
    );
  }
}

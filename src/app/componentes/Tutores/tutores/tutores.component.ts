import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { newTutor, Tutores } from 'src/app/Models/api-models/tutores.model';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { InstitucionService } from 'src/app/services/Instituciones/institucion.service';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { RegisterService } from '../../../services/Auth/register.service';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  estados :Array<any> = [];
  hide = true;
  generos: Array<string> = ['Masculino','Femenino','Otro'];
  public institutions : Array<IInstitution> = [];

  tutor: newTutor = {
    tutor: {
      id:'',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      institutionId: '',
      institutionOther: ' ',
      registrationDate: '',
      profileDescription: '',
      ProfileImageUrl: '',
      userId: '',
      gender: '',
      address: {
        city: '',
        StateProvinceCodeId: '',
        postalCode: '',
        line1: '',
        line2: ''
      },
    },
    user:{
      email: '',
      password: '',
      phoneNumber: ''
    }
  }
  public errorMessage: Array<any> = [];
  public passwordConfirm = '';

  @ViewChild('tutorDetailsForm') tutorDetailsForm?: NgForm;

  constructor(
    private readonly tutorService: TutorService,
    private readonly institutionService: InstitucionService,
    private readonly registerService: RegisterService,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

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

  ngOnInit(): void {
    this.getAll();
    this.tutorService.getTutores()
    .subscribe(
      (success: any)=>{
        console.log(success)
      },
      (error: any)=>{
        console.log(error)
      }
    );
    this.registerService.getStates()
    .subscribe(
      (success) => {
        console.log(success)
        this.estados = success;
      },(error)=>{
        console.log(error)
      }
    )
  }

  onAdd():void{
    this.errorMessage = [];
    if(this.tutorDetailsForm?.form.valid){
      this.tutorService.addTutor(this.tutor)
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
          if(error.error.DuplicateEmail){
            this.errorMessage.push('El correo  '+this.tutor.user.email+'  ya está siendo utilizado.')
          }
          if(error.error.PasswordRequiresDigit){
            this.errorMessage.push('La contraseña debe tener al menos 1 dígito.')
          }
          this.snackbar.open('Error creando cuenta, intente nuevamente.',undefined,{
            duration: 2000
          });
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
          console.log(error);
        }
    );
  }

}

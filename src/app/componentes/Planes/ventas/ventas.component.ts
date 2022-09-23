import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VentasService } from '../../../services/Planes/ventas.service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { ITutor } from 'src/app/Models/api-models/tutores.model';
import { newPaquete, paquete } from 'src/app/Models/api-models/Plans/paquete.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { InstitucionService } from 'src/app/services/Instituciones/institucion.service';
import { templateCreate } from 'src/app/Models/api-models/rutina.model';
import { GestionRutinasService } from 'src/app/services/rutinas/gestion-rutinas.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { paypalProduct } from 'src/app/Models/PayPal/paypal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit {
  @ViewChild('paquetesForm') paquetesForm?: NgForm;
  public tutores : Array<ITutor> = [];
  public templates: Array<templateCreate> = [];
  todayDate:any = new Date();
  dias: FormGroup;

  paqueteController: newPaquete = {
    id: '',
    name: '',
    description: '',
    cost: 0,
    duration: 0,
    discountRate: 0,
    capacity: 0,
    registrationCost: 0,
    schedule: '',
    expirationDate: '',
    templateId: '',
    institutionId: '',
    PayPalProductId: '',
    isTrial: false,
    planDetail: {
      onMonday: false,
      onTuesday: false,
      onWednesday: false,
      onThursday: false,
      onFriday: false,
      onSaturday: false,
      onSunday: false,
    }
  }
  public institutions : Array<IInstitution> = [];
  public institution: string  | undefined;
  public plantilla: string  | undefined;
  public diasdeRutina : string[] = [];
  public paypalCheckBox= false;
  public payPalProducts!: Array<paypalProduct>;
  public freePlan = false;
  constructor(
    private readonly _ventasService: VentasService,
    private readonly tutorService: TutorService,
    private readonly institutionService: InstitucionService,
    private readonly gestionRutinasService: GestionRutinasService,
    private readonly paypalService: PaypalService,
    private snackbar: MatSnackBar,
    private router: Router,
    fb: FormBuilder,
    private datePipe: DatePipe
    ) {
      this.dias = fb.group({
        OnMonday: false,
        OnTuesday: false,
        OnWednesday: false,
        OnThursday: false,
        OnFriday: false,
        OnSaturday: false,
        OnSunday: false,
      });
      this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    }

  ngOnInit(): void {
    console.log(this.todayDate)
    this.getTutors();
    this.getTemplates();
  }

  visualizacion(){
    if(this.paqueteController.institutionId){
      this.institutionService.getInstitution(this.paqueteController.institutionId)
        .subscribe(
          (successResponse)=>{
            this.institution = successResponse.name;
          },
          (error) =>{
            console.log(error);
          }
      );
    }else{
      this.institution = 'Sin institución';
    }
    this.gestionRutinasService.getTemplateWithNoRoutines(this.paqueteController.templateId)
    .subscribe(
      (successResponse)=>{
        this.plantilla = successResponse.name;
      },
      (error) =>{
        console.log(error);
      }
    );
    this.diasdeRutina = [];
    if(this.dias.get('OnMonday')!.value == true)
      this.diasdeRutina.push('Lunes')
      if(this.dias.get('OnTuesday')!.value == true)
      this.diasdeRutina.push('Martes')
    if(this.dias.get('OnWednesday')!.value == true)
      this.diasdeRutina.push('Miércoles')
    if(this.dias.get('OnThursday')!.value == true)
      this.diasdeRutina.push('Jueves')
    if(this.dias.get('OnFriday')!.value == true)
      this.diasdeRutina.push('Viernes')
    if(this.dias.get('OnSaturday')!.value == true)
      this.diasdeRutina.push('Sábado')
    if(this.dias.get('OnSunday')!.value == true)
      this.diasdeRutina.push('Domingo')
  }

  onAdd():void{
    this.paqueteController.planDetail.onMonday = this.dias.get('OnMonday')!.value;
    this.paqueteController.planDetail.onTuesday = this.dias.get('OnTuesday')!.value;
    this.paqueteController.planDetail.onWednesday = this.dias.get('OnWednesday')!.value;
    this.paqueteController.planDetail.onThursday = this.dias.get('OnThursday')!.value;
    this.paqueteController.planDetail.onFriday = this.dias.get('OnFriday')!.value;
    this.paqueteController.planDetail.onSaturday = this.dias.get('OnSaturday')!.value;
    this.paqueteController.planDetail.onSunday = this.dias.get('OnSunday')!.value;


    if(this.freePlan == true){
      this.paqueteController.cost = 0;
      this.paqueteController.duration = 0;
      this.paqueteController.discountRate = undefined;
      this.paqueteController.capacity = 30;
      this.paqueteController.expirationDate = this.todayDate;
      this.paqueteController.isTrial = true;
    }

    if(this.paquetesForm?.form.valid){
      this._ventasService.addPaquete(this.paqueteController)
      .subscribe(
        (successResponse)=>{
          console.log(successResponse);
          this.snackbar.open('Se agregó el paquete con éxito',undefined,{
            duration: 2000
          });
        },
        (error) =>{
          this.snackbar.open('Error creando paquete, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }else{
      this.snackbar.open('Uno o más datos es incorrecto, intente nuevamente.',undefined,{
        duration: 2000
      });
    }
  }

  getTutors(){
    this.tutorService.getTutores()
    .subscribe(
      (success: any)=>{
        console.log(success)
          this.tutores = success;
        },
      (error: any)=>{
        console.log(error)
      }
    );
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

  getTemplates(){
    this.gestionRutinasService.getTemplatesWithNoRoutines()
    .subscribe(
      (successResponse)=>{
        this.templates = successResponse;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  paypalOptions(){
    if(this.paypalCheckBox){
      this.paypalService.getPayPalProducts()
      .subscribe(
        (success)=>{
          this.payPalProducts = success;
        },(error)=>{
          console.log(error)
        }
      )
    }
  }
}

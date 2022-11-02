
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { ITutor } from 'src/app/Models/api-models/tutores.model';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { InstitucionService } from 'src/app/services/Instituciones/institucion.service';
import { templateCreate } from 'src/app/Models/api-models/rutina.model';
import { paypalProduct } from 'src/app/Models/PayPal/paypal';
import { DatePipe } from '@angular/common';
import { newGrupo } from 'src/app/Models/GestionGrupos/grupo.model';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { VentasService } from 'src/app/services/Planes/ventas.service';

@Component({
  selector: 'creacion-grupos',
  templateUrl: './creacion-grupos.component.html',
  styleUrls: ['./creacion-grupos.component.css'],
  providers: [DatePipe]
})

export class CreacionGruposComponent implements OnInit {

  @ViewChild('groupForm') groupForm?: NgForm;
  public tutores : Array<ITutor> = [];
  public templates: Array<templateCreate> = [];
  todayDate:any = new Date();
  tutorsDOM:any;
  isChecked: any;
  plans: Array<any> = [];
  diasDisponibles:number = 0;
  public dias: Array<string> = [];
  public disableDay: boolean = false;

  grupoController: newGrupo = {
    planId: '',
    tutorId : '',
    schedule: '',
    capacity: 0,
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
    onSaturday: false,
    onSunday: false,
    institutionIds: []
  }
  

  public institutions : Array<IInstitution> = [];
  public institutionsChecked : Array<string> = [];
  public institution: string  | undefined;
  public diasdeRutina : string[] = [];
  public paypalCheckBox= false;
  public payPalProducts!: Array<paypalProduct>;
  public freePlan = false;
  constructor(
    private readonly tutorService: TutorService,
    private readonly institutionService: InstitucionService,
    private readonly sharedService: SharedService,
    private readonly ventasService: VentasService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    console.log("LLEGUE")
    console.log(this.todayDate)
    this.getTutors();
    this.getPlans();
    this.getInstitutions();
  }

  
  getTutors(){
    this.tutorService.getTutores()
    .subscribe(
      (success: any)=>{
        console.log(success)
          this.tutorsDOM = success;
        },
      (error: any)=>{
        console.log(error)
      }
    );
  }
  getPlans(){
    this.ventasService.getAllPaquetes()
    .subscribe(
      (success: any)=>{
        console.log(success)
          this.plans = success;
        },
      (error: any)=>{
        console.log(error)
      }
    );
  }
  getInstitutions(){
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

  planSelected(){
    const planSeleccionado = this.plans.find( (p:any) => p.id == this.grupoController.planId)
    this.diasDisponibles = planSeleccionado.numberOfDaysPerWeek    
  }

  onAdd():void{
    this.sharedService.createGroup(this.grupoController)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Se añadió grupoal plan correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  addDay(day:string){    
    if(this.dias.includes(day)){      
      if(day == 'Lu') this.grupoController.onMonday = false;
      if(day == 'Ma') this.grupoController.onTuesday = false;
      if(day == 'Mi') this.grupoController.onWednesday = false;
      if(day == 'Ju') this.grupoController.onThursday = false;
      if(day == 'Vi') this.grupoController.onFriday = false;
      if(day == 'Sa') this.grupoController.onSaturday = false;
      if(day == 'Do') this.grupoController.onSunday = false;
      const dayToDelete = this.dias.findIndex(d => d == day)
      this.dias.splice(dayToDelete,1)
    }else{
      if(day == 'Lu') this.grupoController.onMonday = true;
      if(day == 'Ma') this.grupoController.onTuesday = true;
      if(day == 'Mi') this.grupoController.onWednesday = true;
      if(day == 'Ju') this.grupoController.onThursday = true;
      if(day == 'Vi') this.grupoController.onFriday = true;
      if(day == 'Sa') this.grupoController.onSaturday = true;
      if(day == 'Do') this.grupoController.onSunday = true;
      this.dias.push(day);
    }
    this.disableDay = (this.diasDisponibles == this.dias.length) 
  }

  onCheckboxChange(institucion:any){
    institucion.isChecked != institucion.isChecked;
    if(institucion.isChecked){
      this.institutionsChecked.push(institucion.id)
    }else if(!institucion.isChecked && this.institutionsChecked.includes(institucion.id)){
      const intitutionToDelete = this.institutionsChecked.findIndex(institucionIndex => institucionIndex == institucion.id)
      this.institutionsChecked.splice(intitutionToDelete,1)
    }
    this.grupoController.institutionIds = this.institutionsChecked
  }

}

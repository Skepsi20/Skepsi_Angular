import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { VentasService } from 'src/app/services/Planes/ventas.service';
import { ITutor } from 'src/app/Models/api-models/tutores.model';
import { newPaquete, paquete } from 'src/app/Models/api-models/Plans/paquete.model';
import { IPlanWithTutor } from 'src/app/Models/api-models/Plans/groupOfTutors.model';
import { groupOfTutors, ITutorPlan } from 'src/app/Models/api-models/Plans/groupOfTutors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { newGroup } from 'src/app/Models/api-models/Plans/grupo.model';
import { Router } from '@angular/router';
import { DynamicComponentDirective } from '../../rutinas/dynamic-component.directive';
import { GrupoDetallesComponent } from '../grupo-detalles/grupo-detalles.component';

@Component({
  selector: 'app-lista-de-grupos',
  templateUrl: './lista-de-grupos.component.html',
  styleUrls: ['./lista-de-grupos.component.css']
})

export class ListaDeGruposComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponent!: DynamicComponentDirective;
  public grupos: string = '';
  public allGroups: any = [];
  public grupoSeleccionado = false;
  public tutorsDOM: Array<ITutor> = [];
  public plansDOM: Array<paquete> = [];
  public planWithTutorDOM: Array<IPlanWithTutor> = [];
  public newGroup: newGroup = {
    planId: '',
    tutorId: '',
    code: ''
  };
  public tutorsWithGroup:any = [];
  public tutorsAvailable : Array <ITutor> = [];
  public plan: paquete = {
    id:'',
    name: '',
    description: '',
    cost: 0,
    duration: 0,
    discountRate: 0,
    capacity: 0,
    registrationCost: 0,
    schedule: '',
    expirationDate: '',
    institutionId: '',
    templateId: '',
    externalPlanId:'',
    botonesPayPal:false,
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
  };
  groupToDelete : string = '';
  groupWithNoStudents : Array<boolean> = [];

  @ViewChild('groupsForm') groupsForm?: NgForm;

  constructor(
    private shared: SharedService,
    private readonly TutorService: TutorService,
    private readonly ventasService: VentasService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grupoSeleccionado = false;
    this.grupos = this.shared.getPlan();
    if(this.grupos == ''){
      this.router.navigateByUrl(`/planes`)
    }
    console.log("ID DEL PLAN: "+this.grupos)
    this.getAll();
  }

  getAll(){
    this.shared.getAllgrupos(this.grupos)
      .subscribe(
        (successResponse)=>{
          console.log("LOS GRUPOS",successResponse)
          if(successResponse)
          this.allGroups = successResponse;
          this.tutorsWithGroup = [];
          this.allGroups.forEach((group:any) => {
            this.tutorsWithGroup.push(group.tutor.id)
            if(group.students.length == 0){
              this.groupWithNoStudents.push(false);
            }else{
              this.groupWithNoStudents.push(true);
            }
          });
          this.TutorService.getTutores()
            .subscribe(
              (successResponse)=>{
                this.tutorsDOM = [];
                successResponse.forEach(tutor => {
                  if(!this.tutorsWithGroup?.find((t:any) => t == tutor.id)){
                    this.tutorsDOM.push(tutor);
                  }
                });
              },
              (error) =>{
                console.log(error);
              }
            );
        },
        (error) =>{
          console.log(error);
        }
    );

    this.ventasService.getPaquete(this.grupos)
    .subscribe(
      (successResponse)=>{
        this.plan = successResponse;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  addGrupo(){
    this.newGroup.planId = this.grupos;
    if(this.groupsForm?.form.valid){
      this.shared.createGroup(this.newGroup)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se añadió tutor al plan correctamente',undefined,{
            duration: 2000
          });
          console.log(successResponse);
          this.getAll();
        },
        (error) =>{
          this.snackbar.open('Error asignando tutor al plan, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  setGrupoShared(grupo: string){
    this.shared.setGrupo(grupo);
    this.grupoSeleccionado = true;
    if(this.shared.getGrupo()){
      this.crearRutina();
    }
  }

  crearRutina(){
    const component = this.componentFactoryResolver.resolveComponentFactory(GrupoDetallesComponent);
    this.dynamicComponent.viewContainerRef.createComponent(component);
  }

  destruirRutina(){
    this.dynamicComponent.viewContainerRef.clear();
    this.router.navigateByUrl(`/administrador`)
  }

  deleteGroup(group: string){
    this.groupToDelete = group;
  }

  deleteConfirmation(){
    this.shared.deleteGroup(this.groupToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Grupo eliminado con éxito',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },
      (error) =>{
        this.snackbar.open('Error eliminando el grupo, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

}

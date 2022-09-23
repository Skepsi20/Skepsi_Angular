import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Dynami/Recuperacion/dgnre1012/dgnre1012.component';
import { AGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Antochi/Recuperacion/agnre1012/agnre1012.component';
import { EGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Exousia/Recuperacion/egnre1012/egnre1012.component';
import { DynamicComponentDirective } from '../dynamic-component.directive';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { AMARE1012Component } from '../RutinasEnDesarrollo/amare1012/amare1012.component';
import { Dmaan1012Component } from '../RutinasEnDesarrollo/dmaan1012/dmaan1012.component';
import { Router } from '@angular/router';
import { Amaco1012Component } from '../RutinasTerminadas/Mathimatiki/Antochi/Comprension/amaco1012/amaco1012.component';
import { DGLRE1012Component } from '../RutinasTerminadas/Glossa/Dynami/Recuperacion/dglre1012/dglre1012.component';

@Component({
  selector: 'app-rutina-actual',
  templateUrl: './rutina-actual.component.html',
  styleUrls: ['./rutina-actual.component.css']
})
export class RutinaActualComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponent!: DynamicComponentDirective;
  public nextSession:any;
  public todaySession: any;
  public zoomLink: string = '';
  public zoomPassword: string = '';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private resultsService: ResultsService,
    private router: Router,
  ) { }

  ngOnInit(){
    setInterval(()=> {
      this.checkStatus()
    }
    ,30000);
    this.nextSession = '';
    this.resultsService.getSession()
    .subscribe(
      (success)=>{
        console.log("session de hoy", success)
        this.todaySession = success;
        if(success.routine.code && success.status == 'InProgress'){
          this.zoomLink = success.meetingUrl;
          this.zoomPassword = success.meetingPassword;
          this.elegirRutina(success.routine.code);
        }else{
          this.resultsService.getNextSession(success.plan.id)
          .subscribe(
            (success)=>{
              this.nextSession = success
            },(error)=>{
              console.log(error)
            }
          )
        }
      },(error)=>{
        console.log(error)
      }
    )
  }

  checkStatus(){
    this.resultsService.getSession()
    .subscribe(
      (success)=>{
        this.todaySession = success;
        console.log(this.todaySession.status);
        if(success.status == 'Finished'){
          this.destruirRutina();
          console.log("TERMINADA")
        }
      },(error)=>{
        console.log(error)
      }
    )
  }

  elegirRutina(rutinaDeHoy:string){
    let componenteACrear:any;
    switch(rutinaDeHoy) {
      /* RIX */
      case '1012DGNRE': { componenteACrear = DGNRE1012Component } break;
      case '1012AGNRE': { componenteACrear = AGNRE1012Component } break;
      case '1012EGNRE': { componenteACrear = EGNRE1012Component } break;
      case '1012DGLRE': { componenteACrear = DGLRE1012Component } break;

      /* DANIEL */
      case '1012AMACO': { componenteACrear = Amaco1012Component } break;

      case '1012DMAAN': { componenteACrear = Dmaan1012Component } break;
    }
    this.crearRutina(componenteACrear);
  }

  crearRutina(componenteACrear:any){
    const component = this.componentFactoryResolver.resolveComponentFactory(componenteACrear);
    this.dynamicComponent.viewContainerRef.clear();
    this.dynamicComponent.viewContainerRef.createComponent(component);
  }

  destruirRutina(){
    this.dynamicComponent.viewContainerRef.clear();
    this.router.navigateByUrl(`/usuario`)
  }

}

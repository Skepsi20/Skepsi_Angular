import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Dynami/Recuperacion/dgnre1012/dgnre1012.component';
import { AGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Antochi/Recuperacion/agnre1012/agnre1012.component';
import { EGNRE1012Component } from '../RutinasTerminadas/Gnostiki/Exousia/Recuperacion/egnre1012/egnre1012.component';
import { DynamicComponentDirective } from '../dynamic-component.directive';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { Router } from '@angular/router';
import { Amaco1012Component } from '../RutinasTerminadas/Mathimatiki/Antochi/Comprension/amaco1012/amaco1012.component';
import { DGLRE1012Component } from '../RutinasTerminadas/Glossa/Dynami/Recuperacion/dglre1012/dglre1012.component';
import { Dmaan1012Component } from '../RutinasTerminadas/Mathimatiki/Dynami/Analisis/dmaan1012/dmaan1012.component';
import { Dsyre1012Component } from '../RutinasTerminadas/Synaisthimata/Dynami/Recuperacion/dsyre1012/dsyre1012.component';
import { Dmaco1012Component } from '../RutinasTerminadas/Mathimatiki/Dynami/Comprension/dmaco1012/dmaco1012.component';
import { Emaco1012Component } from '../RutinasTerminadas/Mathimatiki/Exousia/Comprension/emaco1012/emaco1012.component';
import { Amaan1012Component } from '../RutinasTerminadas/Mathimatiki/Antochi/Analisis/amaan1012/amaan1012.component';
import { Emaan1012Component } from '../RutinasTerminadas/Mathimatiki/Exousia/Analisis/emaan1012/emaan1012.component';
import { Aglre1012Component } from '../RutinasTerminadas/Glossa/Antochi/Recuperacion/aglre1012/aglre1012.component';
import { Eglre1012Component } from '../RutinasTerminadas/Glossa/Exousia/Recuperacion/eglre1012/eglre1012.component';
import { Asyre1012Component } from '../RutinasTerminadas/Synaisthimata/Antochi/Recuperacion/asyre1012/asyre1012.component';
import { AMARE1012Component } from '../RutinasTerminadas/Mathimatiki/Antochi/Recuperacion/amare1012/amare1012.component';
import { DGLCO1012Component } from '../RutinasTerminadas/Glossa/Dynami/Comprension/dglco1012/dglco1012.component';
import { Esyre1012Component } from '../RutinasTerminadas/Synaisthimata/Exousia/Recuperacion/esyre1012/esyre1012.component';
import { EGLCO1012Component } from '../RutinasTerminadas/Glossa/Exousia/Comprension/eglco1012/eglco1012.component';
import { AGLCO1012Component } from '../RutinasTerminadas/Glossa/Antochi/Comprension/aglco1012/aglco1012.component';
import { AGNCO1012Component } from '../RutinasTerminadas/Gnostiki/Antochi/Comprension/agnco1012/agnco1012.component';
import { EMARE1012Component } from '../RutinasTerminadas/Mathimatiki/Exousia/Recuperacion/emare1012/emare1012.component';
import { DMARE1012Component } from '../RutinasTerminadas/Mathimatiki/Dynami/Recuperacion/dmare1012/dmare1012.component';
import { DGNCO1012Component } from '../RutinasTerminadas/Gnostiki/Dynami/Comprension/dgnco1012/dgnco1012.component';
import { Dsyco1012Component } from '../RutinasTerminadas/Synaisthimata/Dynami/Comprension/dsyco1012/dsyco1012.component';
import { Asyco1012Component } from '../RutinasTerminadas/Synaisthimata/Antochi/Comprension/asyco1012/asyco1012.component';
import { Esyco1012Component } from '../RutinasTerminadas/Synaisthimata/Exousia/Comprension/esyco1012/esyco1012.component';
import { EGNCO1012Component } from '../RutinasTerminadas/Gnostiki/Exousia/Comprension/egnco1012/egnco1012.component';

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
        if(this.todaySession.routine.code && this.todaySession.status == true){
          this.zoomLink = success.meetingUrl;
          this.zoomPassword = success.meetingPassword;
          this.elegirRutina(this.todaySession.routine.code);
        }/* else{
          this.resultsService.getNextSession(success.plan.id)
          .subscribe(
            (success)=>{
              this.nextSession = success
            },(error)=>{
              console.log(error)
            }
          )
        } */
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

        console.log("STATUS", this.todaySession.status);
        if(this.todaySession.status == false){
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
      case '1012AMARE': { componenteACrear = AMARE1012Component } break;

      case '1012DGNRE': { componenteACrear = DGNRE1012Component } break;
      case '1012AGNRE': { componenteACrear = AGNRE1012Component } break;
      case '1012EGNRE': { componenteACrear = EGNRE1012Component } break;

      case '1012DGLRE': { componenteACrear = DGLRE1012Component } break;
      case '1012AGLRE': { componenteACrear = Aglre1012Component } break;
      case '1012EGLRE': { componenteACrear = Eglre1012Component } break;

      case '1012DGLCO': { componenteACrear = DGLCO1012Component } break;
      case '1012EGLCO': { componenteACrear = EGLCO1012Component } break;
      case '1012AGLCO': { componenteACrear = AGLCO1012Component } break;

      case '1012AGNCO': { componenteACrear = AGNCO1012Component } break;
      case '1012DGNCO': { componenteACrear = DGNCO1012Component } break;
      case '1012EGNCO': { componenteACrear = EGNCO1012Component } break;


      /* DANIEL */
      case '1012AMACO': { componenteACrear = Amaco1012Component } break;
      case '1012DMACO': { componenteACrear = Dmaco1012Component } break;
      case '1012EMACO': { componenteACrear = Emaco1012Component } break;

      case '1012AMAAN': { componenteACrear = Amaan1012Component } break;
      case '1012DMAAN': { componenteACrear = Dmaan1012Component } break;
      case '1012EMAAN': { componenteACrear = Emaan1012Component } break;

      case '1012EMARE': { componenteACrear = EMARE1012Component } break;
      case '1012DMARE': { componenteACrear = DMARE1012Component } break;

      /* OMAR */
      case '1012DSYRE': { componenteACrear = Dsyre1012Component } break;
      case '1012ASYRE': { componenteACrear = Asyre1012Component } break;
      case '1012ESYRE': { componenteACrear = Esyre1012Component } break;

      case '1012DSYCO': { componenteACrear = Dsyco1012Component } break;
      case '1012ASYCO': { componenteACrear = Asyco1012Component } break;
      case '1012ESYCO': { componenteACrear = Esyco1012Component } break;
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

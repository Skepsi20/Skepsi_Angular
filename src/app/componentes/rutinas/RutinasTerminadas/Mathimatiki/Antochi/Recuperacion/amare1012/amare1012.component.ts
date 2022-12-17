import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { amare } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/amare.model';
import { AMARE1012Service } from 'src/app/services/rutinas/amare1012.service';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { SortableData } from 'ngx-sortablejs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amare1012',
  templateUrl: './amare1012.component.html',
  styleUrls: ['./amare1012.component.css']
})
export class AMARE1012Component implements OnInit {
  //VARIABLES RESULTADOS INICIO
  private sessionId: any;
  private resultsTable: resultsWithDate = {
    date: '',
    studentSessionId: '',
    grade: 0,
    round: 0,
    level: 0,
    resultDetails:[{
      possiblePoints: 0,
      points: 0,
      possiblePointsDescription: '',
      pointsDescription: ''
    }]
  }
  private round: number = 0;
  private level: number = 0;
  private studentSessionId: string = '';
  //VARIABLES RESULTADOS FIN

/* VARIABLES DE RUTINA INICIO */
  public cantidadFiguras = [7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  public figurasController: Array<amare> = [];
  public figurasControllerRandom: Array<amare> = [];
  public arregloFiguras: Array<amare> = [];
  public arregloFigurasRandom: Array<amare> = [];
  public figuraDOM: any = [];  
  public arregloRespuestas:any = [];
  
  public instruccionesDOM: boolean = true;
  public mostrarFigurasDOM: boolean = false;
  public resultadosDOM: boolean = false;
  public dragAndDrop: boolean = false;

  options: SortableData = {
    swapThreshold: 0.1,
    invertSwap: true,
    animation: 300,
    ghostClass: 'ghost',
    direction: 'horizontal',
    group: {
      name: 'shared',
    }
 };

  calificacionDOM: number = 0;
  cantidadFigurasDOM: any;
  calificacion: number = 0;
  timeLeft: number = 10;
  timeLeftTwo: number = 60; 
  interval:any;
  intervalTwo:any;
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _amareService: AMARE1012Service,
    private _resultsService: ResultsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.instruccionesFunc();
    this.mostrarFigurasDOM = false;
    this.resultadosDOM = false;
    this.dragAndDrop = false;
    this.figuraDOM[0] = [];
    this.figurasController = this._amareService.getFiguras();
    this.figurasControllerRandom = this.arregloRandom(this.figurasController.length, this.figurasControllerRandom, this.figurasController);
    this.creacionArreglos()
    //this.aprender();
  }
  
  arregloRandom(cantidadDeAudios: any, arregloDestino:any, arregloFuente: any){
    var valor = cantidadDeAudios;
    var fuente = arregloFuente;
    var destino = arregloDestino;
    var arregloRandom = [];
    for (let index = 0; index < valor; index++) {
      arregloRandom[index] = index;
    }
    arregloRandom.sort(() => Math.random() - 0.2);
    for (let index = 0; index < valor; index++) {
      destino[index] = fuente[arregloRandom[index]];
    }
    return destino;
  }

  creacionArreglos(){
    //Imagenes desordenadas listas para mostrar a memorizar
    for (let index = 0; index < this.cantidadFiguras[this.level]; index++) {
      this.arregloFiguras[index] = this.figurasControllerRandom[index];
    }
    //Imagenes desordenadas para mostrar en drag and drop
    this.arregloFigurasRandom = this.arregloRandom(this.cantidadFiguras[this.level], this.arregloFigurasRandom, this.arregloFiguras);
  }

  statusUpdate(){
    this._resultsService.addStatus()
    .subscribe(
      (success)=>{
        console.log("Actividad actualizada")
      },(error)=>{
        console.log(error);
      }
    )
  }

  instruccionesFunc(){
    if(this.timeLeft > 0){
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initRutAudio')
        );
        alarmInitRutina.play();
        this.instruccionesDOM = false;
        this.mostrarFigurasDOM = true;
        this.mostrarFigura();
        clearInterval(this.interval);
      }
    },1000)
  }

  aprender(){
    if(this.timeLeftTwo > 0){
      clearInterval(this.intervalTwo);
    }
    this.intervalTwo = setInterval(() => {
      if(this.timeLeftTwo > 0) {
        this.timeLeftTwo--;
      } else {
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initEjerAudio')
          );
          alarmInitRutina.play();
        clearInterval(this.intervalTwo);
      }
    },1000)
  }

  mostrarFigura(){
    console.log("SIN RANDOM",this.figurasController)    
    console.log("CON RANDOM",this.arregloFiguras)
    console.log("Para mostrar",this.arregloFigurasRandom)
    
    var aux = 0;
    var tiempo = setInterval(()=>{
      if(aux < this.cantidadFiguras[this.level]){
        this.figuraDOM[0] = this.arregloFiguras[aux];
        console.log("La figura actual",this.figuraDOM[0])
        aux++;
      }else if(aux >= this.cantidadFiguras[this.level]){
        clearInterval(tiempo);
        this.dragAndDrop = true;
        this.mostrarFigurasDOM = false;
        this.arregloRespuestas = this.arregloFigurasRandom;
      }
    },5000);
    
  }
  
  revisar(){
    var porcentaje = 0;
    for (let index = 0; index < this.cantidadFiguras[this.level]; index++) {
      if(this.arregloRespuestas[index].nombre == this.arregloFiguras[index].nombre){
        this.calificacion++;
      }
    }
    this.cantidadFigurasDOM = this.cantidadFiguras[this.level];
    this.calificacionDOM = this.calificacion;
  
      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/this.cantidadFiguras[this.level])*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.cantidadFiguras[this.level];
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de figuras geométricas mostradas";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de figuras geométricas memorizadas";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
    porcentaje = this.cantidadFiguras[this.level] * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.resultadosDOM = true;
      this.mostrarFigurasDOM = true;
      this.dragAndDrop = false;
    }else{
      this.cantidadFiguras = this.cantidadFiguras;
      this.resultadosDOM = true;
      this.mostrarFigurasDOM = true;
      this.dragAndDrop = false;
    }
    this.calificacion = 0;
  }



   //RESULTADOS INICIO
  getSession(){
    this._resultsService.getSession()
    .subscribe(
      (success)=>{
        if(success){
          this.sessionId = success.id;
          this.getStudentSessions();
        }else{
          //TODO: show message not session available
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  getStudentSessions(){
    this._resultsService.getStudentSessions()
    .subscribe(
      (success)=>{
        if(success){
          this.studentSessionId = success.id;
          if(success.results[success.results.length-1]){
            this.level = success.results[success.results.length-1].level-1;
            this.round = success.results[success.results.length-1].round;
          }else{
            this.level = 0;
            this.round = 0;
          }
          this.Inicializacion();
        }
        else{
          this._resultsService.addStudentSessions(this.sessionId)
          .subscribe(
            (success)=>{
              this.studentSessionId = success.id;
              this.Inicializacion();
            },
            (error) =>{
              console.log(error)
            }
          );
        }
    },
    (error)=>{
      console.log("ERROR",error)
    });
  }

  addResult(results: resultsWithDate){
    this._resultsService.addResults(results)
    .subscribe(
      (successResponse)=>{
    },
    (error)=>{
      console.log("ERROR",error)
    });
  }
  regresar(){
    this.router.navigateByUrl(`/usuario`) 
    .then(() => {
      window.location.reload();
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { agnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/agnre.model';
import { AGNRE2012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Recuperacion/agnre2012.service';
import { resultados } from 'src/app/Models/api-models/resultados';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';

@Component({
  selector: 'app-agnre1012',
  templateUrl: './agnre1012.component.html',
  styleUrls: ['./agnre1012.component.css'],
})
export class AGNRE1012Component implements OnInit {
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

public banderasController: any;
public banderasControllerRandom: any;
public cantidadBanderas = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
public banderasAcotadas : Array<agnre> = [];
public nombresAcotados : Array<string> = [];
public nombresAcotadosRandom : Array<string> = [];
public banderasAcotadasRandom : Array<agnre> = [];
public banderasDOM : boolean = true;
public nombresDOM : boolean = false;
private posicionDeBandera : number = 0;
public respuestasBanderas : Array<string> = [];
public calificacionDOM : number = 0;
public tiempoAprender : boolean = true;
public resultados : boolean = false;
public banderaVista : Array<agnre> = [];
public banderaVistaDos : Array<agnre> = [];
public opcionesDeBanderas : Array<string> = [];
public opcionesDeBanderasRandom : Array<string> = [];
public respuestaNombres : Array<any> = [];
public calificacion : number = 0;
public aciertosDOM = 0;

//Variables de resultados
private type = 0;

public instrucciones : boolean = true;

timeLeft: number = 10;
timeLeftTwo: number = 120;
interval:any;
intervalTwo:any;

  constructor(
    private _agnreService: AGNRE2012Service,
    private _resultsService: ResultsService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
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

  Inicializacion(){
    this.instruccionesFunc();
    this.tiempoAprender = true;
    this.resultados = false;
    this.banderasDOM = true;
    this.calificacion = 0;
    this.calificacionDOM = 0;
    this.posicionDeBandera = 0;
    this.banderasAcotadas = [];
    this.nombresAcotados = [];
    this.nombresAcotadosRandom = [];
    this.banderasAcotadasRandom = [];
    this.respuestasBanderas = [];
    this.banderaVista = [];
    this.banderaVistaDos = [];
    this.opcionesDeBanderas = [];
    this.opcionesDeBanderasRandom = [];
    this.respuestaNombres = [];
    this.timeLeftTwo = 120;
    this.banderasController = this._agnreService.getBanderas();
    this.banderasControllerRandom = this.banderasController.sort( () => Math.random() - 0.2);
    this.CreacionArreglos(this.cantidadBanderas[this.level], this.banderasControllerRandom);
    this.aprender();
    this.mostrarBN(0);
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
        this.instrucciones  = false;
        clearInterval(this.interval);
      }
    },1000)
  }


  CreacionArreglos(numero : number, banderaFuncion: any){
    for(let index = 0; index < numero; index++) {
      this.banderasAcotadas[index] = banderaFuncion[index];
      this.nombresAcotados.push(banderaFuncion[index].nombre);
    }
    console.log("Arreglo Nombres: "+ this.nombresAcotados);
    console.log("Arreglo de banderas: ", this.banderasAcotadas);

    this.nombresAcotadosRandom = this.nombresAcotados.sort( () => Math.random() - 0.5);
    this.banderasAcotadasRandom = this.banderasAcotadas.sort( () => Math.random() - 0.5);
    this.banderasParaDOM(0);
  }


  aprender(){
    if(this.timeLeftTwo > 0){
      clearInterval(this.intervalTwo);
    }
    this.intervalTwo = setInterval(() => {
      if(this.timeLeftTwo > 0) {
        this.timeLeftTwo--;
      } else {
        this.tiempoAprender  = false;
        clearInterval(this.intervalTwo);
      }
    },1000)
  }


  mostrarBN(valor : number){
    if(valor < this.cantidadBanderas[this.level]){
      this.banderaVista[0] = this.banderasAcotadasRandom[valor];
    }
    else if(this.posicionDeBandera == this.cantidadBanderas[this.level]){
      this.nombresDOM = false;
      this.resultados = true;
      this.revisar();
    }
  }

  banderasParaDOM(valor : number){
      this.opcionesDeBanderas[0] = this.banderasAcotadasRandom[valor].imagen;
      this.opcionesDeBanderas[1] = this.banderasAcotadasRandom[valor].opcion1;
      this.opcionesDeBanderas[2] = this.banderasAcotadasRandom[valor].opcion2;
      this.opcionesDeBanderasRandom = this.opcionesDeBanderas.sort( () => Math.random() - 0.2);
  }

  respuestasBanderasDOM(bandera : any){
    if(!this.respuestasBanderas.length){
      let alarmInitRutina = <HTMLAudioElement>(
        document.getElementById('finEjerAudio')
      );
      alarmInitRutina.play();
    }

      this.respuestasBanderas.push(bandera);
      console.log(this.respuestasBanderas);
      this.posicionDeBandera++;
      if(this.posicionDeBandera < this.cantidadBanderas[this.level]){
        this.banderasParaDOM(this.posicionDeBandera );
      }
      this.mostrarBN(this.posicionDeBandera);
  }

  revisar(){
    var porcentaje = 0;
    for(let index = 0; index < this.cantidadBanderas[this.level]; index++){
      if(this.respuestasBanderas[index] == this.banderasAcotadasRandom[index].imagen){
        this.calificacion++;
      }
    }
    this.calificacionDOM = this.calificacion;
    //LLENADO DE TABLA RESULTS INICIO
    this.round++;
    //StudentSessionId
    this.resultsTable.studentSessionId = this.studentSessionId;

    //Grade
    var partialGrade = (this.calificacion/this.cantidadBanderas[this.level])*100;
    this.resultsTable.grade = partialGrade;

    //Round
    this.resultsTable.round = this.round;

    //level
    this.resultsTable.level = this.level+1;

  //LLENADO DE TABLA RESULTS FIN

  //LLENADO DE TABLA RESULTS DETAILS INICIO
    //Possible points
    this.resultsTable.resultDetails[0].possiblePoints = this.cantidadBanderas[this.level];

    //Points
    this.resultsTable.resultDetails[0].points = this.calificacion;

    //Possible points description
    this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de banderas mostradas";

    //Points description
    this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de banderas memorizadas";

    //Metodo para crear resultado
    this.addResult(this.resultsTable);
  //LLENADO DE TABLA RESULTS DETAILS FIN


  this.aciertosDOM = this.cantidadBanderas[this.level];
    porcentaje = this.cantidadBanderas[this.level] * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.banderasDOM = false;
      this.resultados = true;
    }else{
      this.cantidadBanderas = this.cantidadBanderas;
      this.banderasDOM = false;
      this.resultados = true;
    }
    this.calificacion = 0;

    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();
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
              console.log("AQUI ESTA LA PINCHE SESION", success.id)
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
}

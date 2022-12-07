import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { SortableData } from 'ngx-sortablejs';
import { Router } from '@angular/router';
import { Egnco1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Comprension/egnco1012.service';

@Component({
  selector: 'app-egnco1012',
  templateUrl: './egnco1012.component.html',
  styleUrls: ['./egnco1012.component.css']
})
export class EGNCO1012Component implements OnInit {
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
  public reactivosService: any;

  //VARIABLES DOM
  instruccionesDOM = true;
  resultadosDOM = false;
  dadosYdomino = false;
  contadorDeEstado = -1;
  elementoAMostrar:any;
  respuestas: Array<string> = [];
  respuestasService: Array<string> = [];
  calificacion = 0;
  calificacionDOM = 0;

  timeInstructions: number = 10;
  intervalInstructions:any;

  timerDescanso: number = 60;
  intervalDescanso:any;

  timerEjercicio: number = 300;
  intervalEjercicio:any;
  
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private egncoService: Egnco1012Service,
    private router: Router
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.timerDescanso = 60;  
    this.timerEjercicio = 300;  
    this.resultadosDOM = false;
    this.calificacionDOM = 0;
    this.reactivosService = this.egncoService.getReactivos();
    this.instrucciones();
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

  temporizadorEjercicio(){
    this.timerEjercicio = 300;
    if(this.timerEjercicio > 0){
      clearInterval(this.intervalEjercicio);
    }
    this.intervalEjercicio = setInterval(() => {
      if(this.timerEjercicio > 0) {
        this.timerEjercicio--;
      } else {
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('finEjerAudio')
          );
          //alarmInitRutina.play();
          clearInterval(this.intervalEjercicio);
          this.revisar();
      }
    },1000)
  }

  elementosAMostrar(){
    this.elementoAMostrar = this.reactivosService[this.contadorDeEstado];
    if(this.elementoAMostrar[6]){
      this.respuestasService.push(this.elementoAMostrar[6]) 
    }
  }

  aumentarContadorDeEstado(elemento ?: string){
    if(elemento){
      this.respuestas.push(elemento);
    }
    this.contadorDeEstado++;    
    this.elementosAMostrar();
  }

  // INSTRUCCIONES
  instrucciones(){
    if(this.timeInstructions > 0){
      clearInterval(this.intervalInstructions);
    }
    this.intervalInstructions = setInterval(() => {
      if(this.timeInstructions > 0) {
        this.timeInstructions--;
      } else {
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initRutAudio')
          );
          //alarmInitRutina.play();
          clearInterval(this.intervalInstructions);
          this.instruccionesDOM = false;
          this.dadosYdomino = true;
          this.aumentarContadorDeEstado();
          this.temporizadorEjercicio();
      }
    },1000)
  }

  //DESCANSO
  descanso(){
    if(this.timerDescanso > 0){
      clearInterval(this.intervalDescanso);
    }
    this.intervalDescanso = setInterval(() => {
      if(this.timerDescanso > 0) {
        this.timerDescanso--;
      } else {
        this.Inicializacion();
        clearInterval(this.intervalDescanso);
        this.temporizadorEjercicio();
      }
    },1000)
  }

  revisar(){    
    this.descanso();
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

    for (let index = 0; index < this.contadorDeEstado; index++) {
      if(this.respuestas[index] == this.respuestasService[index]){
        this.calificacion++;
      }
    }

    this.calificacionDOM = this.calificacion;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/this.contadorDeEstado)*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.contadorDeEstado;
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles ejercicios resueltos";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de ejercicios contestados correctamente";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
    this.level++;
    this.dadosYdomino = false;
    this.resultadosDOM = true;    
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
import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';

@Component({
  selector: 'app-agnco1012',
  templateUrl: './agnco1012.component.html',
  styleUrls: ['./agnco1012.component.css']
})
export class AGNCO1012Component implements OnInit {
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
  
  
  avesInstruccion = ''
  mamiferosInstruccion = ''

  //VARIABLES DOM
  instruccionesDOM = true;
  resultadosDOM = false;
  instruccionesAves = false;
  explicacionAves = false;
  ejercicioAves = false;
  instruccionesMamiferos = false;
  explicacionMamiferos = false;
  ejercicioMamiferos = false;

  timeInstructions: number = 10;
  intervalInstructions:any;
  timeDescanso: number = 60;
  intervalDescanso:any;
  
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.timeDescanso = 60;
    this.instruccionesAves = false;
    this.explicacionAves = false;
    this.ejercicioAves = false;
    this.instruccionesMamiferos = false;
    this.explicacionMamiferos = false;
    this.ejercicioMamiferos = false;
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
          alarmInitRutina.play();
          this.instruccionesDOM = false;
          clearInterval(this.intervalInstructions);
      }
    },1000)
  }


  
  //DESCANSO
  descanso(){
    if(this.timeDescanso > 0){
      clearInterval(this.intervalDescanso);
    }
    this.intervalDescanso = setInterval(() => {
      if(this.timeDescanso > 0) {
        this.timeDescanso--;
      } else {
        this.Inicializacion();
        clearInterval(this.intervalDescanso);
      }
    },1000)
  }

  revisar(){
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();
    var porcentaje = 0;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      //////////////////////////var partialGrade = ((this.calificacion/gradeVar)*100);
      //////////////////////////this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      //////////////////////////this.resultsTable.resultDetails[0].possiblePoints = gradeVar;
  
      //Points
      //////////////////////////this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles palabras creadas";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de palabras correctas";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
   /*  porcentaje = gradeVar * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;
      this.includeDOM = false;
    }else{
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;    
      this.includeDOM = false;
    }
    this.calificacion = 0; */
    this.descanso();
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
}
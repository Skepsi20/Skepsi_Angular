import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { SortableData } from 'ngx-sortablejs';
import { Agnco1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Comprension/agnco1012.service';
import { dgnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/agnco.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dgnco1012',
  templateUrl: './dgnco1012.component.html',
  styleUrls: ['./dgnco1012.component.css']
})
export class DGNCO1012Component implements OnInit {

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

  conjuntosService: Array<dgnco> = [];
  secuenciasService: Array<dgnco> = [];
  consecuenciasService: Array<dgnco> = [];
  conjuntoActual: Array<any> = [];
  secuenciaActual: Array<any> = []; 
  consecuenciaActual: Array<any> = [];
  respuestaAux: any;
  respuestas: Array<any> = [];
  respuestasCorrectas: Array<any> = [];  
  calificacion = 0;
  calificacionDOM = 0;
  nivel = 0;

  //VARIABLES DOM
  instruccionesDOM = true;
  resultadosDOM = false;
  conjuntosDOM = false;
  secuenciasDOM = false;
  consecuenciasDOM = false;

  timeInstructions: number = 10;
  intervalInstructions:any;
  timeDescanso: number = 60;
  intervalDescanso:any;

  timeMostrar: number = 30;
  intervalMostrar:any;

  
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private agncoService: Agnco1012Service,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    console.log("EL INDEs", this.nivel)
    this.conjuntosService = this.agncoService.getConjuntos();
    this.secuenciasService = this.agncoService.getSecuencias();
    this.consecuenciasService = this.agncoService.getConsecuencias();
    this.consecuenciasDOM = false;
    this.resultadosDOM = false;
    this.timeDescanso = 60;
    this.respuestasCorrectas = [];
    this.respuestas = [];
    this.conjuntoActual = [];
    this.secuenciaActual = [];
    this.consecuenciaActual = [];
    this.CreacionArreglos();
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

  CreacionArreglos(){
    this.conjuntoActual.push(this.conjuntosService[this.nivel])
    this.respuestasCorrectas.push(this.conjuntosService[this.nivel].respuesta)
    this.secuenciaActual.push(this.secuenciasService[this.nivel])
    this.respuestasCorrectas.push(this.secuenciasService[this.nivel].respuesta)
    this.consecuenciaActual.push(this.consecuenciasService[this.nivel])
    this.respuestasCorrectas.push(this.consecuenciasService[this.nivel].respuesta)
    console.log("EL CONJUNTO ACTUAL",this.conjuntoActual)
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
          this.activarConjuntos();
      }
    },1000)
  }

  activarConjuntos(){
    this.conjuntosDOM = true;
    this.timeMostrar = 30;
    this.mostrarElemento(1);
  }
  activarSecuencias(){
    this.conjuntosDOM = false;
    this.secuenciasDOM = true;
    this.timeMostrar = 30;
    this.mostrarElemento(2);
  }
  activarConsecuencias(){
    this.secuenciasDOM = false;
    this.consecuenciasDOM = true;
    this.timeMostrar = 30;
    this.mostrarElemento(3);
  }

  mostrarElemento(type:number){
    const tipo = type;
    this.intervalMostrar = setInterval(() => {
      if(this.timeMostrar > 0) {
        this.timeMostrar--;
      } else {
        if(tipo == 1){
          if(this.respuestaAux != ''){
            this.respuestas.push(this.respuestaAux)
          }else{
            this.respuestas.push('')
          }
          this.respuestaAux = '';
          clearInterval(this.intervalMostrar);
          this.activarSecuencias();
        }else if(tipo == 2){
          if(this.respuestaAux != ''){
            this.respuestas.push(this.respuestaAux)
          }else{
            this.respuestas.push('')
          }
          this.respuestaAux = '';
          clearInterval(this.intervalMostrar);
          this.activarConsecuencias();
        }else if(tipo == 3){
          this.consecuenciasDOM = false;
          if(this.respuestaAux != ''){
            this.respuestas.push(this.respuestaAux)
          }else{
            this.respuestas.push('')
          }
          this.respuestaAux = '';
          clearInterval(this.intervalMostrar);
          this.revisar();
        }
      }
    },1000)
  }

  agregarRespuesta(valor: any){
    this.respuestaAux = valor;
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
    this.descanso();
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

    for (let index = 0; index < 3; index++) {
      if(this.respuestas[index] === this.respuestasCorrectas[index]){
        this.calificacion++
      }
    }

    this.calificacionDOM = this.calificacion;
    var porcentaje = 0;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/3)*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = 3;
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles ejercicios resueltos";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de ejercicios correctos";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
   porcentaje = 2;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.nivel++;
      this.resultadosDOM = true;
    }else{
      this.resultadosDOM = true;    
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
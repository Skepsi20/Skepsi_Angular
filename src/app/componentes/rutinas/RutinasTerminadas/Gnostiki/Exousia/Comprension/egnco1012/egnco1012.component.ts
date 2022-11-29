import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { SortableData } from 'ngx-sortablejs';
import { Router } from '@angular/router';

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


  //VARIABLES DOM
  instruccionesDOM = true;
  resultadosDOM = false;


  timeInstructions: number = 10;
  intervalInstructions:any;
  timeDescanso: number = 60;
  intervalDescanso:any;
  timeMostrar: number = 30;
  intervalMostrar:any;

  
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) { 
    
  }

  arraysCreation(){
    
  }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.arraysCreation();
    this.timeDescanso = 60;
    
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

  CreacionArreglos(){
    //Imagenes desordenadas listas para mostrar a memorizar
    for (let index = 0; index < 5; index++) {
      /* 
      this.avesRandomCinco[index] = this.avesRandom[index];
      this.mamiferosRandomCinco[index] = this.mamiferosRandom[index]; */
    }
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
      }
    },1000)
  }


  mostrarElemento(type:number){

    this.intervalMostrar = setInterval(() => {
      if(this.timeMostrar > 0) {
        this.timeMostrar--;
      } else {
        
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
    this.descanso();
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

    /* for(let i = 0; i<5; i++){
      for (let j = 0; j < this.respuestasAvesAcumulado[i].length; j++) {
        if(this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].boca ||
          this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].ojos ||
          this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].patas ){
            console.log("Correcta para aves valor = ", this.respuestasAvesAcumulado[i][j], "boca ", this.avesRandomCinco[j].boca, "ojos ", this.avesRandomCinco[j].ojos, "patas ", this.avesRandomCinco[j].patas)
            this.calificacion++
        }    
      }
    }

    
    for(let i = 0; i<5; i++){
      for (let j = 0; j < this.respuestasMamiferosAcumulado[i].length; j++) {
        if(this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].boca ||
          this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].ojos ||
          this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].patas ){
            console.log("Correcta para mamiferos valor = ", this.respuestasMamiferosAcumulado[i][j], "mandibula ", this.mamiferosRandomCinco[j].boca, "ojos ", this.mamiferosRandomCinco[j].ojos, "patas ", this.mamiferosRandomCinco[j].patas)
            this.calificacion++
        } 
      }
    } */

    /////////////////////////////////////////////this.calificacionDOM = this.calificacion;

    var porcentaje = 0;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      /////////////////////////////////////////////var partialGrade = ((this.calificacion/30)*100);
      ///////////////////////////////////////////this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = 30;
  
      //Points
      //this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles palabras creadas";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de palabras correctas";
  
      //Metodo para crear resultado
      ///////////////////////////////////////////this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
   /* porcentaje = 30 * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.ejercicioMamiferos = false;
      this.resultadosDOM = true;
    }else{
      this.ejercicioMamiferos = false;
      this.resultadosDOM = true;    
    }
    this.calificacion = 0; */
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
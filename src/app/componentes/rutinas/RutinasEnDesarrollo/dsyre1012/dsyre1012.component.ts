import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

enum DSYRE1012Step {
  Instructions,
  Introduction,
  FacesWithEmotions1,
  FacesWithEmotions2,
  Story1,
  Story2,
  Story3,
  Story4,
  Story5,
  StudentEmotions
}

@Component({
  selector: 'app-dsyre1012',
  templateUrl: './dsyre1012.component.html',
  styleUrls: ['./dsyre1012.component.css']
})

export class Dsyre1012Component implements OnInit {

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

  public calificacion : number = 0;

  public resultados : boolean = false;
  public rutina : boolean = true;
  public tiempoAprender : boolean = true;

  public currentStep: DSYRE1012Step = DSYRE1012Step.Instructions;

  readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];

  public emocionesBasicas: string[] = [...this.emocionesBasicasDefault];
  public emocionesSecundarias: string[] = [...this.emocionesSecundariasDefault];

  public get DSYRE1012Step(): typeof DSYRE1012Step {
    return DSYRE1012Step;
  }

  timeLeft: number = 10;
  timeLeftTwo: number = 120;
  interval:any;
  intervalTwo:any;

  emocionesImagen1: string[] = [];
  emocionesImagen2: string[] = [];
  emocionesImagen3: string[] = [];
  emocionesImagen4: string[] = [];
  emocionesImagen5: string[] = [];
  emocionesImagen6: string[] = [];
  emocionesImagen7: string[] = [];
  emocionesImagen8: string[] = [];
  emocionesImagen9: string[] = [];
  emocionesImagen10: string[] = [];
  emocionesImagen11: string[] = [];
  emocionesImagen12: string[] = [];
  emocionesImagen13: string[] = [];
  emocionesImagen14: string[] = [];
  emocionesImagen15: string[] = [];
  emocionesImagen16: string[] = [];
  emocionesImagen17: string[] = [];
  emocionesImagen18: string[] = [];
  emocionesImagen19: string[] = [];
  emocionesImagen20: string[] = [];
  emocionesImagen21: string[] = [];
  emocionesImagen22: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
  }

  constructor(
    private _resultsService: ResultsService
  ) { }

  ngOnInit(): void {
    this.Inicializacion();
    // setInterval(()=> this.statusUpdate(),30000);
    // this.getSession();
  }

  // statusUpdate(){
  //   this._resultsService.addStatus()
  //   .subscribe(
  //     (success)=>{
  //       console.log("Actividad actualizada")
  //     },(error)=>{
  //       console.log(error);
  //     }
  //   )
  // }

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
        this.currentStep  = DSYRE1012Step.Introduction;
        clearInterval(this.interval);
      }
    },100)
  }

  Inicializacion(){
    this.instruccionesFunc();
    this.resultados = false;
    this.tiempoAprender = true;
    this.rutina = true;
    this.timeLeftTwo = 120;
    // this.aprender();
  }

  mostrarCaras() {
    console.log("Se muestran las caras");

    this.currentStep  = DSYRE1012Step.FacesWithEmotions1;
    this.mostrarCarasDOM = true;
  }

  esEmocionBasica(emocion: string): boolean {
    return this.emocionesBasicasDefault.includes(emocion);
  }

  // aprender(){
  //   if(this.timeLeftTwo > 0){
  //     clearInterval(this.intervalTwo);
  //   }
  //   this.intervalTwo = setInterval(() => {
  //     if(this.timeLeftTwo > 0) {
  //       this.timeLeftTwo--;
  //     } else {
  //       this.tiempoAprender  = false;
  //       clearInterval(this.intervalTwo);
  //     }
  //   },1000)
  // }

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
      var partialGrade = 100;
      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

    //LLENADO DE TABLA RESULTS FIN

    //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = 1;

      //Points
      this.resultsTable.resultDetails[0].points = 1;

      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Actividad de identificación y análisis de emociones";

      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Actividad de identificación y análisis de emociones";

      //Metodo para crear resultado
      this.addResult(this.resultsTable);
    //LLENADO DE TABLA RESULTS DETAILS FIN
  }


  //RESULTADOS INICIO
  // getSession(){
  //   this._resultsService.getSession()
  //   .subscribe(
  //     (success)=>{
  //       if(success){
  //         this.sessionId = success.id;
  //         this.getStudentSessions();
  //       }else{
  //         //TODO: show message not session available
  //       }
  //     },
  //     (error) =>{
  //       console.log(error);
  //     }
  //   );
  // }

  getStudentSessions(){
    this._resultsService.getStudentSessions()
    .subscribe(
      (success)=>{
        if(success){
          this.studentSessionId = success.id;
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

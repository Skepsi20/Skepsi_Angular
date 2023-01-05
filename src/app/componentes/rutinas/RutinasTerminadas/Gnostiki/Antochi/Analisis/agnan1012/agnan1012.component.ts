import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// #region Tipos locales
enum AGNAN1012Step {
  Instructions,
  Mechanisms,
  End
}

// #endregion Tipos locales

@Component({
  selector: 'app-agnan1012',
  templateUrl: './agnan1012.component.html',
  styleUrls: ['./agnan1012.component.css']
})
export class Agnan1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly mechanismMinIndex: number = 0;
  public readonly mechanismMaxIndex: number = 10;
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly exampleReadonlyVariable: string[] = []; // TODO: Delete if not used
  // #endregion Variables privadas de solo-lectura

  // #region Variables de resultados
  private sessionId: any;
  private resultsTable?: resultsWithDate;
  private round: number = 1;
  private level: number = 1;
  private studentSessionId: string = '';
  // #endregion Variables de resultados

  // #region Variables públicas
  public calificacion : number = 0;
  public resultados : boolean = false;
  public rutina : boolean = true;
  public tiempoAprender : boolean = true;

  public timeLeft: number = 10;
  public timeLeftTwo: number = 120;
  public interval: any;
  public intervalTwo: any;

  public currentStep: AGNAN1012Step;
  public mechanismIndex: number;

  public get AGNAN1012Step(): typeof AGNAN1012Step {
    return AGNAN1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) {
    this.currentStep = AGNAN1012Step.Instructions;
    this.mechanismIndex = 0;
  }

  ngOnInit(): void {
    //TODO: Restore changes
    this.initializeComponent();

    // setInterval(()=> this.statusUpdate(), 30000);
    // this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    switch(this.currentStep) {
      case AGNAN1012Step.Instructions:
        this.currentStep  = AGNAN1012Step.Mechanisms;
        break;

      case AGNAN1012Step.Mechanisms:
        // TODO:
        if (this.mechanismIndex < this.mechanismMaxIndex) {
          this.mechanismIndex++;
        }
        else {
          this.sendResult();
          this.currentStep  = AGNAN1012Step.End;
        }
        break;

    }
  }

  public previousScenario(): void {
    this.mechanismIndex--;
  }

  public nextScenario(): void {
    this.mechanismIndex++;
  }

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  // #endregion Funciones públicas

  // #region Funciones privadas
  private initializeComponent() {
    this.showInstructions();
    this.resultados = false;
    this.tiempoAprender = true;
    this.timeLeftTwo = 120;
  }

  private statusUpdate() {
    this._resultsService.addStatus()
    .subscribe(
      () => {/* Actividad actualizada */}
      ,(error) => {
        console.log(error);
      }
    )
  }

  private showInstructions() {
    if(this.timeLeft > 0) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        let alarmInitRutina = <HTMLAudioElement>(document.getElementById('initRutAudio'));
        alarmInitRutina.play();
        this.currentStep  = AGNAN1012Step.Mechanisms;
        clearInterval(this.interval);
      }
    }, 100) // TODO: Set back to 1000
  }

  // #region Funciones privadas con interacción con la API
  private addResult(results: resultsWithDate) {
    this._resultsService.addResults(results)
    .subscribe(
      (successResponse)=>{
    },
    (error)=>{
      console.log("Error al agregar un resultado:\n",error)
    });
  }

  private sendResult() {
    this.round;
    this.resultsTable = {
      date: '',
      studentSessionId: this.studentSessionId,
      grade: 100,
      round: this.round,
      level: this.level,
      resultDetails:[{
        possiblePoints: 1,
        points: 1,
        possiblePointsDescription: 'Cantidad total de mecanismos',
        pointsDescription: 'Cantidad de mecanismos armados'
      },
      {
        possiblePoints: 1,
        points: 1,
        possiblePointsDescription: 'Porcentaje total',
        pointsDescription: 'Porcentaje de acierto'
      }]
    }

    this.addResult(this.resultsTable);
  }

  private getSession() {
    this._resultsService.getSession()
    .subscribe(
      (success)=>{
        if (success) {
          this.sessionId = success.id;
          this.getCurrentStudentSession();
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  private getCurrentStudentSession() {
    this._resultsService.getStudentSessions()
    .subscribe(
      (success)=>{
        if(success){
          this.studentSessionId = success.id;
          this.initializeComponent();
        }
        else{
          this._resultsService.addStudentSessions(this.sessionId)
          .subscribe(
            (success)=>{
              this.studentSessionId = success.id;
              this.initializeComponent();
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
  regresar(){
    this.router.navigateByUrl(`/usuario`)
    .then(() => {
      window.location.reload();
    });
  }
  // #endregion Funciones privadas con interacción con la API
  // #endregion Funciones privadas
}

import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// #region Tipos locales
enum AGNAN1012Step {
  Instructions,
  MechanismPresentation,
  MechanismSteps,
  Timeout,
  End
}

interface IMechanism {
  numberOfSteps: number;
  steps: IStep[];
  mechanismIndex: number;
}

interface IStep {
  selectedParts: string[];
  correctParts: string[];
  stepIndex: number;
  relatedStepsIndexes: number[];
  text: string;
}

interface IResources {
  lblUnion: string;
  lblBuild: string;
  lblFromAToB: string;
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
  private readonly partsDefault: string[] = ['Boton', 'Camilla', 'Dentada', 'Engrane', 'Gancho', 'LaminaAzul', 'LaminaMini', 'Lengueta', 'Llanta', 'Mascarilla',
    'MiniPiezaU', 'Palanca', 'Perfil', 'PiezaBlanca', 'PiezaL', 'PiezaLAzul', 'PiezaU2', 'Pivote', 'Puentesito', 'Rondana', 'RondanaGorda', 'Seguro',
    'Seguro2', 'Tornillo', 'Tornillo2', 'Triangulo', 'Tuerca', 'Varilla'];
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
  public stepIndex: number;
  public mechanisms: IMechanism[];
  public resources: IResources;
  public parts: string[];

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
    this.mechanismIndex = 1;
    this.stepIndex = 7; // TODO: Regresar a 0
    this.resources = {
      lblBuild: '¿Qué piezas se utilizaron para armar la imagen?',
      lblFromAToB: '¿Qué piezas se utilizaron para pasar de la imagen de la izquierda a la imagen de la derecha?',
      lblUnion: '¿Qué piezas se utilizaron para unir los armados de la izquierda y llegar a la imagen de la derecha?'
    }
    this.mechanisms = this.initializeMechanisms();
    this.parts = this.resetParts();
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
        this.currentStep  = AGNAN1012Step.MechanismPresentation;
        break;

      case AGNAN1012Step.MechanismPresentation:
        this.currentStep  = AGNAN1012Step.MechanismSteps;
        break;

      case AGNAN1012Step.MechanismSteps:
        if (this.stepIndex < (this.mechanisms[this.mechanismIndex].numberOfSteps - 1)) {
          this.stepIndex++;
        }
        else if (this.mechanismIndex < this.mechanismMaxIndex) {
          this.startOneMinuteBreak();
          this.currentStep = AGNAN1012Step.Timeout;
        }
        else{
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
        alarmInitRutina.volume = 0.2;
        alarmInitRutina.play();
        this.currentStep  = AGNAN1012Step.MechanismPresentation;
        clearInterval(this.interval);
      }
    }, 100) // TODO: Set back to 1000
  }

  private resetParts(): string[] {
    return [...this.partsDefault];
  }

  private startOneMinuteBreak(): void {
    if(this.timeLeft > 0) {
      clearInterval(this.interval);
    }

    this.timeLeft = 600;

    this.interval = setInterval(() => {
      console.log(this.timeLeft);
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.mechanismIndex++;
        this.stepIndex = 0;
        this.currentStep = AGNAN1012Step.MechanismPresentation;
        clearInterval(this.interval);
      }
    }, 100);
  }

  private initializeMechanisms(): IMechanism[] {
    return [
      {
        mechanismIndex: 0,
        numberOfSteps: 13,
        steps: []
      },
      {
        mechanismIndex: 1,
        numberOfSteps: 11,
        steps: [
          {
            correctParts: ['Tuerca', 'Rondana', 'Perfil', 'MiniPiezaU', 'Tornillo'],
            selectedParts: [],
            stepIndex: 0,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['Perfil', 'MiniPiezaU', 'Tornillo', 'Tuerca', 'Camilla'],
            selectedParts: [],
            stepIndex: 1,
            relatedStepsIndexes: [0],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['RondanaGorda', 'MiniPiezaU', 'Tornillo', 'Tuerca2', 'Boton'],
            selectedParts: [],
            stepIndex: 2,
            relatedStepsIndexes: [1],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Llanta', 'Dentada', 'Tornillo2', 'Tuerca'],
            selectedParts: [],
            stepIndex: 3,
            relatedStepsIndexes: [2],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['MiniPiezaU', 'Tornillo', 'Tuerca'],
            selectedParts: [],
            stepIndex: 4,
            relatedStepsIndexes: [3],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['PiezaL', 'LaminaAzul', 'Tornillo', 'Tuerca'],
            selectedParts: [],
            stepIndex: 5,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['PiezaL', 'LaminaAzul', 'Tornillo', 'Tuerca'],
            selectedParts: [],
            stepIndex: 6,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['Tornillo', 'Tuerca'],
            selectedParts: [],
            stepIndex: 7,
            relatedStepsIndexes: [4, 5, 6],
            text: this.resources.lblUnion
          },
          {
            correctParts: ['LaminaMini', 'Tornillo', 'Tuerca', 'Mascarilla', 'Lengueta'],
            selectedParts: [],
            stepIndex: 8,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['LaminaAzul', 'Tornillo', 'Tuerca'],
            selectedParts: [],
            stepIndex: 9,
            relatedStepsIndexes: [7, 8],
            text: this.resources.lblUnion
          },
          {
            correctParts: ['Varilla', 'Llanta', 'Tuerca', 'Seguro2', 'Seguro'],
            selectedParts: [],
            stepIndex: 10,
            relatedStepsIndexes: [9],
            text: this.resources.lblFromAToB
          }
        ]
      },
      {
        mechanismIndex: 2,
        numberOfSteps: 13,
        steps: [
          {
            correctParts: ['Tornillo', 'Tuerca', 'Tornillo2', 'Dentada', 'PiezaL', 'MiniPiezaU', 'LaminaAzul', 'Rondana', 'Triangulo'],
            selectedParts: [],
            stepIndex: 0,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['Tornillo', 'Tuerca', 'Tornillo2', 'Dentada', 'PiezaL', 'MiniPiezaU', 'LaminaAzul', 'Rondana', 'Triangulo'],
            selectedParts: [],
            stepIndex: 1,
            relatedStepsIndexes: [0],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Perfil', 'Tornillo', 'Tuerca', 'Camilla'],
            selectedParts: [],
            stepIndex: 2,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['Tornillo', 'Tuerca', 'Mascarilla'],
            selectedParts: [],
            stepIndex: 3,
            relatedStepsIndexes: [2],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Tornillo', 'Tuerca', 'Mascarilla'],
            selectedParts: [],
            stepIndex: 4,
            relatedStepsIndexes: [1, 3],
            text: this.resources.lblUnion
          },
          {
            correctParts: ['Lengueta', 'Tuerca', 'Tornillo2', 'Gancho'],
            selectedParts: [],
            stepIndex: 5,
            relatedStepsIndexes: [4],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Varilla', 'Tornillo2', 'Tuerca', 'Palanca'],
            selectedParts: [],
            stepIndex: 6,
            relatedStepsIndexes: [5],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['LaminaAzul', 'Perfil', 'Tornillo', 'Tuerca', 'Rondana'],
            selectedParts: [],
            stepIndex: 7,
            relatedStepsIndexes: [],
            text: this.resources.lblBuild
          },
          {
            correctParts: ['LaminaMini', 'Tornillo', 'Rondana', 'Tuerca', 'MiniPiezaU'],
            selectedParts: [],
            stepIndex: 8,
            relatedStepsIndexes: [7],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Varilla', 'Perfil', 'MiniPiezaU', 'Tornillo', 'Tuerca', 'Engrane'],
            selectedParts: [],
            stepIndex: 9,
            relatedStepsIndexes: [8],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Engrane', 'Tornillo', 'Boton', 'Tuerca', 'Rondana', 'PiezaU2'],
            selectedParts: [],
            stepIndex: 10,
            relatedStepsIndexes: [6, 9],
            text: this.resources.lblUnion
          },
          {
            correctParts: ['LaminaMini', 'Tornillo', 'Rondana', 'Seguro', 'Seguro2', 'Tuerca', 'Tornillo', 'Pivote', 'Palanca'],
            selectedParts: [],
            stepIndex: 11,
            relatedStepsIndexes: [10],
            text: this.resources.lblFromAToB
          },
          {
            correctParts: ['Llanta', 'Varilla', 'Boton', 'Seguro', 'Rondana'],
            selectedParts: [],
            stepIndex: 12,
            relatedStepsIndexes: [11],
            text: this.resources.lblFromAToB
          }
        ]
      }
    ];
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

import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

// #region Tipos locales
enum ASYRE1012Step {
  Instructions,
  Introduction,
  FacesEmotions,
  ScenariosActing,
  ScenariosActingExagerated,
  ScenariosDragAndDrop,
  ScenariosDragAndDropOrdered,
  ScenariosDragAndDropContained,
  ScenariosDragAndDropContainedOrdered,
  Introspective,
}

interface IImageEmotion {
  imageUrl: string;
  emotions: string[]
}
// #endregion Tipos locales

@Component({
  selector: 'app-asyre1012',
  templateUrl: './asyre1012.component.html',
  styleUrls: ['./asyre1012.component.css']
})
export class Asyre1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly scenarioMinIndex: number = 0;
  public readonly scenarioMaxIndex: number = 5;
  public readonly imagesDirectory: string = '../assets/img/emociones';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly imageEmotionsDefault: string[] = [
    `${this.imagesDirectory}/Alegría1.png`,
    `${this.imagesDirectory}/Alegría2.png`,
    `${this.imagesDirectory}/Asco1.png`,
    `${this.imagesDirectory}/Bochorno1.png`,
    `${this.imagesDirectory}/Bochorno2.png`,
    `${this.imagesDirectory}/Complacencia1.png`,
    `${this.imagesDirectory}/Culpa1.png`,
    `${this.imagesDirectory}/Culpa2.png`,
    `${this.imagesDirectory}/Desprecio1.png`,
    `${this.imagesDirectory}/Enfadado1.png`,
    `${this.imagesDirectory}/Entusiasmo1.png`,
    `${this.imagesDirectory}/Entusiasmo2.png`,
    `${this.imagesDirectory}/Interés1.png`,
    `${this.imagesDirectory}/Interés2.png`,
    `${this.imagesDirectory}/Miedo1.png`,
    `${this.imagesDirectory}/Orgullo1.png`,
    `${this.imagesDirectory}/Placer1.png`,
    `${this.imagesDirectory}/Satisfacción1.png`,
    `${this.imagesDirectory}/Sorpresa1.png`,
    `${this.imagesDirectory}/Sorpresa2.png`,
    `${this.imagesDirectory}/Tristeza1.png`,
    `${this.imagesDirectory}/Vergüenza1.png`
  ];
  // #endregion Variables privadas de solo-lectura

  // #region Variables de resultados
  private sessionId: any;
  private resultsTable?: resultsWithDate;
  private round: number = 0;
  private level: number = 0;
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

  public currentStep: ASYRE1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public emocionesBasicasSeleccionadas: string[];
  public emocionesSecundariasSeleccionadas: string[];
  public imageEmotions: IImageEmotion[];
  public showStoriesEmotions: boolean;
  public charactersOfCurrentStory: IImageEmotion[];
  public scenarioIndex: number;
  public imageEmotionDescriptions: string[] = [
    'Alegría',
    'Alegría',
    'Asco',
    'Bochorno',
    'Bochorno',
    'Complacencia',
    'Culpa',
    'Culpa',
    'Desprecio',
    'Enfado',
    'Entusiasmo',
    'Entusiasmo',
    'Interés',
    'Interés',
    'Miedo',
    'Orgullo',
    'Placer',
    'Satisfacción',
    'Sorpresa',
    'Sorpresa',
    'Tristeza',
    'Vergüenza',
  ];

  public get ASYRE1012Step(): typeof ASYRE1012Step {
    return ASYRE1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService
  ) {
    this.imageEmotions = this.resetImageEmotions();
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.emocionesBasicasSeleccionadas = [];
    this.emocionesSecundariasSeleccionadas = [];
    this.currentStep = ASYRE1012Step.Instructions;
    this.showStoriesEmotions = false;
    this.charactersOfCurrentStory = [];
    this.scenarioIndex = 0;
  }

  ngOnInit(): void {
    this.initializeComponent();

    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    switch(this.currentStep) {
      case ASYRE1012Step.Instructions:
        this.currentStep  = ASYRE1012Step.Introduction;
        break;

      case ASYRE1012Step.Introduction:
        this.currentStep  = ASYRE1012Step.FacesEmotions;
        break;

      case ASYRE1012Step.FacesEmotions:
        this.currentStep  = ASYRE1012Step.ScenariosActing;
        break;

      case ASYRE1012Step.ScenariosActing:
        this.currentStep  = ASYRE1012Step.ScenariosActingExagerated;
        break;

      case ASYRE1012Step.ScenariosActingExagerated:
        this.currentStep  = ASYRE1012Step.ScenariosDragAndDrop;
        break;

      case ASYRE1012Step.ScenariosDragAndDrop:
        this.currentStep  = ASYRE1012Step.ScenariosDragAndDropOrdered;
        break;

      case ASYRE1012Step.ScenariosDragAndDropOrdered:
        this.currentStep  = ASYRE1012Step.ScenariosDragAndDropContained;
        this.resetDragAndDrops();
        break;

      case ASYRE1012Step.ScenariosDragAndDropContained:
        this.currentStep  = ASYRE1012Step.ScenariosDragAndDropContainedOrdered;
        break;

      case ASYRE1012Step.ScenariosDragAndDropContainedOrdered:
        this.currentStep  = ASYRE1012Step.Introspective;
        this.resetDragAndDrops();
        if (this.scenarioIndex == this.scenarioMaxIndex) {
          this.sendResult();
        }
        break;

      case ASYRE1012Step.Introspective:
        if (this.scenarioIndex < this.scenarioMaxIndex) {
          this.currentStep  = ASYRE1012Step.ScenariosActing;
          this.scenarioIndex++;
        }
        break;
    }
  }

  public previousScenario(): void {
    this.scenarioIndex--;
  }

  public nextScenario(): void {
    this.scenarioIndex++;
  }

  public isBasicEmotion(emocion: string): boolean {
    return this.emocionesBasicasDefault.includes(emocion);
  }

  public resetDragAndDrops(): void {
    this.emocionesBasicas = [...this.emocionesBasicasDefault]
        this.emocionesBasicasSeleccionadas = []
        this.emocionesSecundarias = [...this.emocionesSecundariasDefault]
        this.emocionesSecundariasSeleccionadas = []
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

  private resetImageEmotions(): IImageEmotion[] {
    let imageEmotions: IImageEmotion[] = [];
    for(let i = 0; i < this.imageEmotionsDefault.length; i++) {
      let imageUrl: string = this.imageEmotionsDefault[i];

      imageEmotions.push({
        imageUrl: imageUrl,
        emotions: [this.imageEmotionDescriptions[i]]
      })
    }

    return imageEmotions;
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
        this.currentStep  = ASYRE1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 1000)
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
    this.round++;
    this.resultsTable = {
      date: '',
      studentSessionId: this.studentSessionId,
      grade: 100,
      round: this.round,
      level: this.level + 1,
      resultDetails:[{
        possiblePoints: 1,
        points: 1,
        possiblePointsDescription: 'Actividad de análisis y experimentación de emociones',
        pointsDescription: 'Actividad de análisis y experimentación de emociones'
      }]
    }

    this.addResult(this.resultsTable);
  }

  private getSession() {
    this._resultsService.getSession()
    .subscribe(
      (success)=>{
        if(success){
          this.sessionId = success.id;
          this.getCurrentStudentSession();
        } else {
          //TODO: show message not session available
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
  // #endregion Funciones privadas con interacción con la API
  // #endregion Funciones privadas
}

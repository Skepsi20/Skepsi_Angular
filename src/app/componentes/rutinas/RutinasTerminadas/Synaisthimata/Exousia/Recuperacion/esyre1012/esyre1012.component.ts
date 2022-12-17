import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// #region Tipos locales
enum ESYRE1012Step {
  Instructions,
  Introduction,
  YearsBeforeTable,
  RecentTable,
  ComparisonTable
}
// #endregion Tipos locales

@Component({
  selector: 'app-esyre1012',
  templateUrl: './esyre1012.component.html',
  styleUrls: ['./esyre1012.component.css']
})
export class Esyre1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly scenarioMinIndex: number = 0;
  public readonly scenarioMaxIndex: number = 5;
  public readonly imagesDirectory: string = '../assets/img/emociones';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly placesDefault: string[] = ["balneario", "carretera", "casa", "centrocomercial", "ciudad", "escuela", "parque", "playa", "restaurante", "rio"];
  // #endregion Variables privadas de solo-lectura

  // #region Variables de resultados
  private sessionId: any;
  private resultsTable?: resultsWithDate;
  private round: number = 0;
  private level: number = 0;
  private studentSessionId: string = '';
  // #endregion Variables de resultados

  // #region Variables públicas
  public tiempoAprender : boolean = true;

  public timeLeft: number = 10;
  public timeLeftTwo: number = 120;
  public interval: any;
  public intervalTwo: any;

  public currentStep: ESYRE1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public places: string[];
  public sixYearPlace: string[];
  public sixYearEmotions: string[];
  public sevenYearPlace: string[];
  public sevenYearEmotions: string[];
  public eightYearPlace: string[];
  public eightYearEmotions: string[];
  public nineYearPlace: string[];
  public nineYearEmotions: string[];
  public selectedEmotion: string[];

  public get ESYRE1012Step(): typeof ESYRE1012Step {
    return ESYRE1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) {
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.places = [...this.placesDefault];
    this.sixYearPlace = [];
    this.sixYearEmotions = [];
    this.sevenYearPlace = [];
    this.sevenYearEmotions = [];
    this.eightYearPlace = [];
    this.eightYearEmotions = [];
    this.nineYearPlace = [];
    this.nineYearEmotions = [];
    this.selectedEmotion = [];
    this.currentStep = ESYRE1012Step.Instructions;
  }

  ngOnInit(): void {
    this.initializeComponent();

    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    switch(this.currentStep) {
      case ESYRE1012Step.Instructions:
        this.currentStep  = ESYRE1012Step.Introduction;
        break;

      case ESYRE1012Step.Introduction:
        this.currentStep  = ESYRE1012Step.YearsBeforeTable;
        break;

      case ESYRE1012Step.YearsBeforeTable:
        this.currentStep  = ESYRE1012Step.RecentTable;
        this.resetDragAndDrops();
        break;

      case ESYRE1012Step.RecentTable:
        this.sendResult();
        this.currentStep  = ESYRE1012Step.ComparisonTable;
        this.resetDragAndDrops();
        break;

      case ESYRE1012Step.ComparisonTable:
        this.resetDragAndDrops();
        var textareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          textarea.value = '';
          textarea.style.height = ''
          textarea.style.height = textarea.scrollHeight + 5 +'px'
        })
        break;
    }
  }

  public isBasicEmotion(emocion: string): boolean {
    return this.emocionesBasicasDefault.includes(emocion);
  }

  public resetDragAndDrops(): void {
    this.emocionesBasicas = [...this.emocionesBasicasDefault]
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault]
    this.sixYearPlace = [];
    this.sixYearEmotions = [];
    this.sevenYearPlace = [];
    this.sevenYearEmotions = [];
    this.eightYearPlace = [];
    this.eightYearEmotions = [];
    this.nineYearPlace = [];
    this.nineYearEmotions = [];
    this.selectedEmotion = [];
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
    this.places = [...this.placesDefault];
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.deleteRepeated();
  }

  public dropSixYearPlace(event: CdkDragDrop<string[]>): void {
    this.sixYearPlace = this.dropSingle(event);
  }

  public dropSevenYearPlace(event: CdkDragDrop<string[]>): void {
    this.sevenYearPlace = this.dropSingle(event);
  }

  public dropEightYearPlace(event: CdkDragDrop<string[]>): void {
    this.eightYearPlace = this.dropSingle(event);
  }

  public dropNineYearPlace(event: CdkDragDrop<string[]>): void {
    this.nineYearPlace = this.dropSingle(event);
  }

  public dropSingleEmotion(event: CdkDragDrop<string[]>): void {
    event.currentIndex = 0;
    event.container.data = [];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.selectedEmotion = event.container.data;
  }
  // #endregion Funciones públicas

  // #region Funciones privadas
  private initializeComponent() {
    this.showInstructions();
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
        this.currentStep  = ESYRE1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 1000)
  }

  private deleteRepeated(): void {
    this.sixYearEmotions = [...new Set(this.sixYearEmotions)];
    this.sevenYearEmotions = [...new Set(this.sevenYearEmotions)];
    this.eightYearEmotions = [...new Set(this.eightYearEmotions)];
    this.nineYearEmotions = [...new Set(this.nineYearEmotions)];
  }

  private dropSingle(event: CdkDragDrop<string[]>): string[] {
    event.currentIndex = 0;
    event.container.data = [];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.places = [...this.placesDefault]
    return event.container.data;
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
  regresar(){
    this.router.navigateByUrl(`/usuario`) 
    .then(() => {
      window.location.reload();
    });
  }
  // #endregion Funciones privadas con interacción con la API
  // #endregion Funciones privadas
}

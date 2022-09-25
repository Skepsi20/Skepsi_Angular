import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

// #region Tipos locales
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

interface IImageEmotion {
  imageUrl: string;
  emotions: string[]
}
// #endregion Tipos locales

@Component({
  selector: 'app-dsyre1012',
  templateUrl: './dsyre1012.component.html',
  styleUrls: ['./dsyre1012.component.css']
})

export class Dsyre1012Component implements OnInit {

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
  public interval:any;
  public intervalTwo:any;


  public currentStep: DSYRE1012Step = DSYRE1012Step.Instructions;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public imageEmotions: IImageEmotion[];

  public get DSYRE1012Step(): typeof DSYRE1012Step {
    return DSYRE1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly imageEmotionsDefault: IImageEmotion[] = [
    { imageUrl: '../../../../../assets/img/emociones/Alegría1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Alegría2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Asco1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Bochorno1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Bochorno2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Complacencia1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Culpa1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Culpa2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Desprecio1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Enfadado1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Entusiasmo1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Entusiasmo2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Interés1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Interés2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Miedo1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Orgullo1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Placer1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Satisfacción1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Sorpresa1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Sorpresa2.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Tristeza1.png', emotions: [] },
    { imageUrl: '../../../../../assets/img/emociones/Vergüenza1.png', emotions: [] },
  ];
  // #endregion Variables privadas de solo-lectura

  constructor(
    private _resultsService: ResultsService
  ) {
    this.imageEmotions = [...this.imageEmotionsDefault];
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
  }

  ngOnInit(): void {
    this.initializeComponent();

    // TODO: Uncomment to update activity status when finished
    // setInterval(()=> this.statusUpdate(),30000);
    // this.getSession();
  }

  // #region Funciones públicas
  public goToStepFacesWithEmotions1() {
    this.currentStep  = DSYRE1012Step.FacesWithEmotions1;
  }

  public isBasicEmotion(emocion: string): boolean {
    return this.emocionesBasicasDefault.includes(emocion);
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

    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
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
        this.currentStep  = DSYRE1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 100)
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

  private grade() {
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

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
        possiblePointsDescription: 'Actividad de identificación y análisis de emociones',
        pointsDescription: 'Actividad de identificación y análisis de emociones'
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

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
  StoriesInstructions,
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

  // #region Variables públicas de solo-lectura
  public readonly storyMinIndex: number = 0;
  public readonly storyMaxIndex: number = 8;
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

  public currentStep: DSYRE1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public imageEmotions: IImageEmotion[];
  public storyIndex: number;
  public showStoriesEmotions: boolean;
  public charactersOfCurrentStory: IImageEmotion[];

  public get DSYRE1012Step(): typeof DSYRE1012Step {
    return DSYRE1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  private charactersByStory: IImageEmotion[][] = [
    [
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino0.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino1.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino2.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino3.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino4.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino5.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino6.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino7.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino8.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/BufonCampesino9.png`, emotions: [] }
    ],
    [
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas0.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas1.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas2.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas3.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas4.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas5.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas6.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas7.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas8.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas9.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas10.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas11.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas12.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/CuervoPlumas13.png`, emotions: [] }
    ],
    [
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton0.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton1.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton2.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton3.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton4.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton5.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton6.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton7.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton8.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton9.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LeonRaton10.png`, emotions: [] }
    ],
    [
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos0.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos1.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos2.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos3.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos4.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos5.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/LoboCabritos6.png`, emotions: [] }
    ],
    [
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey0.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey1.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey2.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey3.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey4.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey5.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey6.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey7.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey8.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey9.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey10.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey11.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey12.png`, emotions: [] },
      { imageUrl: `${this.imagesDirectory}/personajes/RanaRey13.png`, emotions: [] }
    ]
  ];
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService
  ) {
    this.imageEmotions = this.resetImageEmotions();
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.currentStep = DSYRE1012Step.Instructions;
    this.storyIndex = 0;
    this.showStoriesEmotions = false;
    this.charactersOfCurrentStory = [];
  }

  ngOnInit(): void {
    this.initializeComponent();
    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public showStoryEmotions(): void {
    this.showStoriesEmotions = true;

    switch(this.currentStep) {
      case DSYRE1012Step.Story1:
        this.charactersOfCurrentStory = this.charactersByStory[0];
        break;
      case DSYRE1012Step.Story2:
        this.charactersOfCurrentStory = this.charactersByStory[1];
        break;
      case DSYRE1012Step.Story3:
        this.charactersOfCurrentStory = this.charactersByStory[2];
        break;
      case DSYRE1012Step.Story4:
        this.charactersOfCurrentStory = this.charactersByStory[3];
        break;
      case DSYRE1012Step.Story5:
        this.charactersOfCurrentStory = this.charactersByStory[4];
        break;
    }
  }

  public nextStep(): void {
    switch(this.currentStep) {
      case DSYRE1012Step.Instructions:
        this.currentStep  = DSYRE1012Step.Introduction;
        break;

      case DSYRE1012Step.Introduction:
        this.currentStep  = DSYRE1012Step.FacesWithEmotions1;
        break;

      case DSYRE1012Step.FacesWithEmotions1:
        this.currentStep  = DSYRE1012Step.FacesWithEmotions2;
        this.imageEmotions = this.resetImageEmotions();

        let facesDiv = document.getElementById('caras-div');
        if (facesDiv) {
          facesDiv.scrollTop = 0;
        }
        break;

      case DSYRE1012Step.FacesWithEmotions2:
        this.currentStep  = DSYRE1012Step.StoriesInstructions;
        this.imageEmotions = this.resetImageEmotions();
        break;

      case DSYRE1012Step.StoriesInstructions:
        this.currentStep  = DSYRE1012Step.Story1;
        break;

      case DSYRE1012Step.Story1:
        this.showStoriesEmotions = false;
        this.storyIndex = this.storyMinIndex;
        this.currentStep  = DSYRE1012Step.Story2;
        break;

      case DSYRE1012Step.Story2:
        this.showStoriesEmotions = false;
        this.storyIndex = this.storyMinIndex;
        this.currentStep  = DSYRE1012Step.Story3;
        break;

      case DSYRE1012Step.Story3:
        this.showStoriesEmotions = false;
        this.storyIndex = this.storyMinIndex;
        this.currentStep  = DSYRE1012Step.Story4;
        break;

      case DSYRE1012Step.Story4:
        this.showStoriesEmotions = false;
        this.storyIndex = this.storyMinIndex;
        this.currentStep  = DSYRE1012Step.Story5;
        break;

      case DSYRE1012Step.Story5:
        this.showStoriesEmotions = false;
        this.storyIndex = this.storyMinIndex;
        this.currentStep  = DSYRE1012Step.StudentEmotions;
        this.sendResult();
        break;
    }
  }

  public previousPicture(): void {
    this.storyIndex--;
  }

  public nextPicture(): void {
    this.storyIndex++;
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
      this.deleteRepeated();
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

  private deleteRepeated(): void {
    if (this.currentStep == DSYRE1012Step.FacesWithEmotions1 || this.currentStep == DSYRE1012Step.FacesWithEmotions2) {
      this.imageEmotions.forEach(imageEmotion => {
        imageEmotion.emotions = [...new Set(imageEmotion.emotions)];
      });
    }
    else {
      this.charactersOfCurrentStory.forEach(imageEmotion => {
        imageEmotion.emotions = [...new Set(imageEmotion.emotions)];
      });
    }
  }

  private resetImageEmotions(): IImageEmotion[] {
    return this.imageEmotionsDefault.map(imageUrl => {
      return {
        imageUrl: imageUrl,
        emotions: []
      }
    });
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

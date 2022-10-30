import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatSliderChange } from '@angular/material/slider';

// #region Tipos locales
enum ASYCO1012Step {
  Instructions,
  Introduction,
  AudiosAndEmotions,
  End
}

interface IImageEmotionAffection {
  imageUrl: string;
  affections: string[];
  emotion: string;
}

interface IAudioEmotionsAffection {
  audioUrl: string;
  basicEmotions: string[];
  secondaryEmotions: string[];
  affections: string[];
}

// #endregion Tipos locales

@Component({
  selector: 'app-asyco1012',
  templateUrl: './asyco1012.component.html',
  styleUrls: ['./asyco1012.component.css']
})
export class Asyco1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly audioMinIndex: number = 0;
  public readonly audioMaxIndex: number = 14;
  public readonly imagesDirectory: string = '../assets/img/emociones';
  public readonly audiosDirectory: string = '../assets/Audios/asyco1012';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly afeccionesDefault1: string[] = ['Generosidad', 'Agradecimiento', 'Bondad', 'Amabilidad', 'Integridad', 'Honestidad', 'Templanza', 'Serenidad'];
  private readonly afeccionesDefault2: string[] = ['Compasión', 'Aceptación', 'Benevolencia', 'Empatía', 'Armonía', 'Humildad', 'Autonomía'];
  private readonly audiosDefault: string[] = [
    'BachTocataFuga.mp3',
    'BizetOperaCarmen.mp3',
    'ChopinNocturno.mp3',
    'KhachaturianSabreDance.mp3',
    'KorsakovMoscardon.mp3',
    'MozartFlautaMagica.mp3',
    'MozartSereneta13.mp3',
    'MozartSonata11.mp3',
    'RavelBolero.mp3',
    'RossiniObertura.mp3',
    'StraussSaratustra.mp3',
    'TchaikovskyCascanueces.mp3',
    'TheodorakisGriego.mp3',
    'VivaldiPrimaveraAllegro.mp3',
    'WagnerCabalgata.mp3'
  ];

  // TODO: Agregar "Confianza" cuando tenga la imagen
  private readonly emotions: string[] = [
    'alegria',
    'asco',
    'bochorno',
    'complacencia',
    'culpa',
    'desprecio',
    'enfado',
    'entusiasmo',
    'interes',
    'miedo',
    'orgullo',
    `placer`,
    'satisfaccion',
    'sorpresa',
    'tristeza',
    'verguenza',
  ];
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

  public imageEmotionAffections: IImageEmotionAffection[];
  public currentStep: ASYCO1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public emocionesAfeccionesSeleccionadas: string[];
  public afecciones1: string[];
  public afecciones2: string[];
  public audioIndex: number;
  public audios: IAudioEmotionsAffection[];
  public currentAudio: HTMLAudioElement;
  public currentAudioTime: number;

  public afeccionesAlegria: string[];
  public afeccionesEnfado: string[];
  public afeccionesMiedo: string[];
  public afeccionesTristeza: string[];
  public afeccionesSorpresa: string[];
  public afeccionesAsco: string[];
  public afeccionesConfianza: string[];
  public afeccionesInteres: string[];
  public afeccionesVerguenza: string[];
  public afeccionesCulpa: string[];
  public afeccionesBochorno: string[];
  public afeccionesSatisfaccion: string[];
  public afeccionesDesprecio: string[];
  public afeccionesEntusiasmo: string[];
  public afeccionesComplacencia: string[];
  public afeccionesOrgullo: string[];
  public afeccionesPlacer: string[];
  public volume: number;
  public currentVolumeImage: string;

  public get ASYCO1012Step(): typeof ASYCO1012Step {
    return ASYCO1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService
  ) {
    this.imageEmotionAffections = this.resetImageEmotionAffections();
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.emocionesAfeccionesSeleccionadas = [];
    this.currentStep = ASYCO1012Step.Instructions;
    this.audioIndex = 0;
    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
    this.audios = this.setAudioEmotionAffections();
    this.volume = 0.6;
    this.currentVolumeImage = 'VolumeMedium';
    this.currentAudio = new Audio();
    this.currentAudioTime = 0;

    this.afeccionesAlegria = [];
    this.afeccionesEnfado = [];
    this.afeccionesMiedo = [];
    this.afeccionesTristeza = [];
    this.afeccionesSorpresa = [];
    this.afeccionesAsco = [];
    this.afeccionesConfianza = [];
    this.afeccionesInteres = [];
    this.afeccionesVerguenza = [];
    this.afeccionesCulpa = [];
    this.afeccionesBochorno = [];
    this.afeccionesSatisfaccion = [];
    this.afeccionesDesprecio = [];
    this.afeccionesEntusiasmo = [];
    this.afeccionesComplacencia = [];
    this.afeccionesOrgullo = [];
    this.afeccionesPlacer = [];
  }

  ngOnInit(): void {
    this.initializeComponent();

    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    switch(this.currentStep) {
      case ASYCO1012Step.Instructions:
        this.currentStep  = ASYCO1012Step.Introduction;
        break;

      case ASYCO1012Step.Introduction:
        this.currentStep  = ASYCO1012Step.AudiosAndEmotions;

        this.currentAudio = new Audio(this.audios[this.audioIndex].audioUrl)
        this.currentAudio.volume = this.volume;
        setInterval(() => this.currentAudioTime = this.currentAudio.currentTime, 100);
        break;

      case ASYCO1012Step.AudiosAndEmotions:
        if(this.audioIndex == 3) {
          this.sendResult();
        }

        if (this.audioIndex < this.audioMaxIndex) {
          this.audioIndex++;
          this.resetDragAndDrops();
        }
        else {
          this.currentStep  = ASYCO1012Step.End;
        }
        break;
    }
  }

  public previousScenario(): void {
    this.audioIndex--;
  }

  public nextScenario(): void {
    this.audioIndex++;
  }

  public togglePlayPause(): void {
    if (this.currentAudio.paused) {
      this.currentAudio.play();
    }
    else {
      this.currentAudio.pause();
    }
  }

  public restartAudio(): void {
    this.currentAudio.currentTime = 0;
  }

  public resetDragAndDrops(): void {
    this.emocionesBasicas = [...this.emocionesBasicasDefault]
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault]
    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
    this.emocionesAfeccionesSeleccionadas = []
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

  public onChangeVolume(event: MatSliderChange) {
    if (event.value) {
      if (this.currentAudio) {
        this.currentAudio.volume = event.value;
      }

      if (event.value == 0.01) {
        this.currentVolumeImage = 'VolumeMute';
      }
      else if (event.value > 0.01 && event.value <= 0.4) {
        this.currentVolumeImage = 'VolumeLow';
      }
      else if (event.value > 0.5 && event.value <= 0.9) {
        this.currentVolumeImage = 'VolumeMedium';
      }
      else if (event.value > 0.9) {
        this.currentVolumeImage = 'VolumeHigh'
      }
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

  private resetImageEmotionAffections(): IImageEmotionAffection[] {
    return this.emotions.map(emotion => {
      return {
        imageUrl: `${this.imagesDirectory}/dibujos/${emotion}.png`,
        affections: [],
        emotion: emotion
      }
    });
  }

  private setAudioEmotionAffections(): IAudioEmotionsAffection[] {
    return this.audiosDefault.map(audioName => {
      return {
        affections: [],
        basicEmotions: [],
        secondaryEmotions: [],
        audioUrl: `${this.audiosDirectory}/${audioName}`
      }
    })
  }

  private showInstructions() {
    if(this.timeLeft > 0) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // TODO: Check if uncomment
        // let alarmInitRutina = <HTMLAudioElement>(document.getElementById('initRutAudio'));
        // alarmInitRutina.play();
        this.currentStep  = ASYCO1012Step.Introduction;
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
    // TODO: Revisar detalles al enviar el resultado. (Possible points y points)
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
        possiblePointsDescription: 'Tipos de afectos relacionados con la musica que escuchó',
        pointsDescription: 'Tipos de afectos relacionados con la musica que escuchó'
      },
      {
        possiblePoints: 1,
        points: 1,
        possiblePointsDescription: 'Determinación de emociones que fundamentaron los afectos de la música que escuchó',
        pointsDescription: 'Determinación de emociones que fundamentaron los afectos de la música que escuchó'
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

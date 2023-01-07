import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { results } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';

// #region Tipos locales
enum ASYCO1012Step {
  Instructions,
  Introduction,
  AudiosAndEmotions,
  OneMinuteBreak,
  End
}

interface IAudioEmotionsAffection {
  audioUrl: string;
  selections: string[];
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
  // #endregion Variables privadas de solo-lectura

  // #region Variables de resultados
  private sessionId: any;
  private resultsTable?: results;
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
  public interval: any;

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
  public volume: number;
  public currentVolumeImage: string;
  public hasHeardMusic: boolean;

  public get ASYCO1012Step(): typeof ASYCO1012Step {
    return ASYCO1012Step;
  }
  // #endregion Variables públicas

  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) {
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
    this.hasHeardMusic = false;
  }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    let contentContainerDiv = document.getElementById('content-container')

    switch(this.currentStep) {
      case ASYCO1012Step.Instructions:
        this.currentStep  = ASYCO1012Step.Introduction;
        break;

      case ASYCO1012Step.Introduction:
        if (contentContainerDiv) {
          contentContainerDiv.scrollTop = 0;
        }

        this.currentStep  = ASYCO1012Step.AudiosAndEmotions;

        this.currentAudio = new Audio(this.audios[this.audioIndex].audioUrl)
        this.currentAudio.volume = this.volume;
        setInterval(() => this.checkAudioTime(), 100);
        break;

      case ASYCO1012Step.AudiosAndEmotions:
        if (contentContainerDiv) {
          contentContainerDiv.scrollTop = 0;
        }

        if(this.audioIndex == 3) {
          this.sendResult();
        }

        if (this.audioIndex < this.audioMaxIndex) {
          this.currentAudio.pause();
          this.currentAudio = new Audio(this.audios[++this.audioIndex].audioUrl)
          this.currentAudio.volume = this.volume;
          this.resetAudioActivityState();
          this.currentStep  = ASYCO1012Step.OneMinuteBreak;
          this.startOneMinuteBreak();
        }
        else {
          this.currentAudio.pause();
          this.currentStep  = ASYCO1012Step.End;
        }
        break;

      case ASYCO1012Step.OneMinuteBreak:
        this.currentStep  = ASYCO1012Step.AudiosAndEmotions;
        break;
    }
  }

  public checkAudioTime(): void {
    this.currentAudioTime = this.currentAudio.currentTime;
    if (this.currentAudio.duration - this.currentAudio.currentTime < 3) {
      this.hasHeardMusic = true;
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

  public resetAudioActivityState(): void {
    this.emocionesBasicas = [...this.emocionesBasicasDefault]
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault]
    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
    this.emocionesAfeccionesSeleccionadas = []
    this.hasHeardMusic = false;
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

  public isBasicEmotion(item: string): boolean {
    return this.emocionesBasicasDefault.includes(item);
  }

  public isSecondaryEmotion(item: string): boolean {
    return this.emocionesSecundariasDefault.includes(item);
  }

  public isAffection(item: string): boolean {
    return this.afeccionesDefault1.includes(item) || this.afeccionesDefault2.includes(item);
  }

  public hasSelectedItems(): boolean {
    return this.audios[this.audioIndex].selections.length > 1;
  }
  // #endregion Funciones públicas

  // #region Funciones privadas
  private initializeComponent() {
    this.showInstructions();
    this.resultados = false;
    this.tiempoAprender = true;
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

  private setAudioEmotionAffections(): IAudioEmotionsAffection[] {
    return this.audiosDefault.map(audioName => {
      return {
        selections: [],
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
        let alarmInitRutina = <HTMLAudioElement>(document.getElementById('initRutAudio'));
        alarmInitRutina.volume = 0.2;
        alarmInitRutina.play();
        this.currentStep  = ASYCO1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 1000)
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
        this.currentStep  = ASYCO1012Step.AudiosAndEmotions;
        clearInterval(this.interval);
      }
    }, 100);
  }

  // #region Funciones privadas con interacción con la API
  private addResult(results: results) {
    this._resultsService.addResults(results)
    .subscribe(
      (successResponse)=>{
    },
    (error)=>{
      console.log("Error al agregar un resultado:\n",error)
    });
  }

  private sendResult() {
    let emotionsSelected: string[] = this.audios[this.audioIndex].selections.filter(s => this.isBasicEmotion(s) || this.isSecondaryEmotion(s));
    let afectionsSelected: string[] = this.audios[this.audioIndex].selections.filter(s => this.isAffection(s));

    this.resultsTable = {
      date: '',
      studentSessionId: this.studentSessionId,
      grade: 100,
      round: this.round,
      level: this.level,
      resultDetails:[{
        possiblePoints: afectionsSelected.length,
        points: afectionsSelected.length,
        possiblePointsDescription: 'Tipos de afectos relacionados con la musica que escuchó',
        pointsDescription: 'Tipos de afectos relacionados con la musica que escuchó'
      },
      {
        possiblePoints: emotionsSelected.length,
        points: emotionsSelected.length,
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
        if (success) {
          this.studentSessionId = success.id;
          if (success.results[success.results.length-1]) {
            this.level = success.results[success.results.length-1].level + 1;
            this.round = success.results[success.results.length-1].round + 1;
            this.audioIndex = this.round - 1;
          }
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

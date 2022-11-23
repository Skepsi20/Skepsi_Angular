import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { results } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';

// #region Tipos locales
enum ESYCO1012Step {
  Instructions,
  Introduction,
  Advertencia,
  Yoga,
  End
}
// #endregion Tipos locales

@Component({
  selector: 'app-esyco1012',
  templateUrl: './esyco1012.component.html',
  styleUrls: ['./esyco1012.component.css']
})
export class Esyco1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly audiosDirectory: string = '../assets/Audios/esyco1012';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly afeccionesDefault1: string[] = ['Generosidad', 'Agradecimiento', 'Bondad', 'Amabilidad', 'Integridad', 'Honestidad', 'Templanza', 'Serenidad'];
  private readonly afeccionesDefault2: string[] = ['Compasión', 'Aceptación', 'Benevolencia', 'Empatía', 'Armonía', 'Humildad', 'Autonomía'];
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

  public currentStep: ESYCO1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public emocionesAfeccionesSeleccionadas: string[];
  public afecciones1: string[];
  public afecciones2: string[];
  public yogaAudio: HTMLAudioElement;
  public yogaAudioTime: number;
  public volume: number;
  public currentVolumeImage: string;
  public hasHeardMusic: boolean;

  public get ESYCO1012Step(): typeof ESYCO1012Step {
    return ESYCO1012Step;
  }
  // #endregion Variables públicas

  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) {
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.emocionesAfeccionesSeleccionadas = [];
    this.currentStep = ESYCO1012Step.Instructions;
    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
    this.volume = 0.6;
    this.currentVolumeImage = 'VolumeMedium';
    this.yogaAudio = new Audio(`${this.audiosDirectory}/YogaMusica.mp3`);
    this.yogaAudioTime = 0;
    this.hasHeardMusic = false;
  }

  ngOnInit(): void {
    this.initializeComponent();

    setInterval(()=> this.statusUpdate(), 30000);
    this.getSession();
  }

  // #region Funciones públicas
  public nextStep(): void {
    let contentContainerDiv = document.getElementById('content-container')

    switch(this.currentStep) {
      case ESYCO1012Step.Instructions:
        this.currentStep  = ESYCO1012Step.Introduction;
        break;

      case ESYCO1012Step.Introduction:
        this.currentStep  = ESYCO1012Step.Advertencia;
        break;

      case ESYCO1012Step.Advertencia:
        this.yogaAudio.loop = true;
        this.yogaAudio.volume = this.volume;
        this.yogaAudio.play();

        if (contentContainerDiv) {
          contentContainerDiv.scrollTop = 0;
        }
        this.currentStep  = ESYCO1012Step.Yoga;
        break;
    }
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

  public togglePlayPause(): void {
    if (this.yogaAudio.paused) {
      this.yogaAudio.play();
    }
    else {
      this.yogaAudio.pause();
    }
  }

  public onChangeVolume(event: MatSliderChange) {
    if (event.value) {
      if (this.yogaAudio) {
        this.yogaAudio.volume = event.value;
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

  private showInstructions() {
    if(this.timeLeft > 0) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        let alarmInitRutina = <HTMLAudioElement>(document.getElementById('initRutAudio'));
        alarmInitRutina.volume = 0.4;
        alarmInitRutina.play();
        this.currentStep  = ESYCO1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 100) // TODO: Regresar a 1000
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

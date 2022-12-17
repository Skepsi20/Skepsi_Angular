import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { results } from 'src/app/Models/Resultados/sessionsResults';
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

interface IPose {
  name: string,
  description: string
}

interface IPoseImage extends IPose {
  fileName: string
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
  public readonly imagesDirectory: string = '../assets/img/emociones/yoga';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly afeccionesDefault1: string[] = ['Generosidad', 'Agradecimiento', 'Bondad', 'Amabilidad', 'Integridad', 'Honestidad', 'Templanza', 'Serenidad'];
  private readonly afeccionesDefault2: string[] = ['Compasión', 'Aceptación', 'Benevolencia', 'Empatía', 'Armonía', 'Humildad', 'Autonomía'];
  private readonly posturasDefault: IPose[] = [
    {name: 'ExtensionLateral', description:'Extensión lateral'},
    {name: 'InclinacionHaciaDelante', description:'Inclinación hacia adelante'},
    {name: 'ManosLevantadas', description:'Manos levantadas'},
    {name: 'PiernaEstirada', description:'Pierna estirada'},
    {name: 'PosturaArbol', description:'Postura del árbol'},
    {name: 'PosturaBarco', description:'Postura del barco'},
    {name: 'PosturaCamello', description:'Postura del camello'},
    {name: 'PosturaCobra', description:'Postura de la cobra'},
    {name: 'PosturaCorporal', description:'Postura corporal'},
    {name: 'PosturaDeArado', description:'Postura de arado'},
    {name: 'PosturaGato', description:'Postura del gato'},
    {name: 'PosturaGuerrero1', description:'Postura del guerrero 1'},
    {name: 'PosturaGuerrero2', description:'Postura del guerrero 2'},
    {name: 'PosturaGuerrero3', description:'Postura del guerrero 3'},
    {name: 'PosturaLoto', description:'Postura del loto'},
    {name: 'PosturaNino', description:'Postura del niño'},
    {name: 'PosturaPuente', description:'Postura del puente'},
    {name: 'PosturaSilla', description:'Postura de la silla'},
    {name: 'PosturaTabla', description:'Postura de la tabla'},
    {name: 'PosturaVaca', description:'Postura de la vaca'},
    {name: 'PosturaZigzag', description:'Postura de zig zag'},
    {name: 'Rezar', description:'Postura de rezar'},
    {name: 'SoporteHombros', description:'Soporte en hombros'}
  ];
  private readonly audiosAleatoriosDefault: string[] = [
    'CaraDeChango',
    'CaraDeLlantaAplastada',
    'EresLoPeor',
    'EresUnTorpe',
    'GuacalaAsqueroso',
    'GuacalaYaBanate',
    'NacoVuelveATuBarrio',
    'NiParaEsoSirves',
    'ParacesUnChango',
    'ParecesUnTopo',
    'PorEsoNadieTeTomaEnSerio',
    'PorEsoNoTienesAmigos',
    'PorEsoNoTienesQuienTeQuiera',
    'QueRatitoTeVes',
    'QueRidiculo',
    'RidiculoSiTeVieraTuMama',
    'TeniaQueSer',
    'TeVesRidiculo',
    'TipicoDeTi',
    'TuPapaNoTeQuiere',
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
  public posturasDeYoga: IPoseImage[];
  public poseIndex: number;
  public audiosAleatorios: string[];
  public randomAudio: HTMLAudioElement;
  public randomAudioIndex: number;
  public randomAudioTimer?: NodeJS.Timeout;

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
    this.yogaAudio = new Audio(`${this.audiosDirectory}/MusicaYoga.mp3`);
    this.yogaAudioTime = 0;
    this.posturasDeYoga = this.getYogaImages();
    this.poseIndex = 0;
    this.audiosAleatorios = this.getRandomAudios();
    this.randomAudioIndex = 0;
    this.randomAudio = new Audio(`${this.audiosDirectory}/${this.audiosAleatorios[this.randomAudioIndex]}`);
  }

  ngOnInit(): void {
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

        if (contentContainerDiv) {
          contentContainerDiv.scrollTop = 0;
        }
        this.currentStep  = ESYCO1012Step.Yoga;
        this.sendResult();
        break;
    }
  }

  public getYogaImages(): IPoseImage[] {
    return this.posturasDefault.map((pose: IPose) => {
      return {
        ...pose,
        fileName: `${this.imagesDirectory}/${pose.name}.png`
      }
    })
  }

  public getRandomAudios(): string[] {
    return this.audiosAleatoriosDefault.map(audioName => `${this.audiosDirectory}/${audioName}.mp3`)
  }

  public togglePlayPause(): void {
    if (this.yogaAudio.paused) {
      this.yogaAudio.play();

      if (this.randomAudioTimer) {
        clearInterval(this.randomAudioTimer);
        this.randomAudioTimer = undefined;
      }
      else {
        this.randomAudioTimer = setInterval(() => {
          if (!this.yogaAudio.paused) {
            this.randomAudio = new Audio(this.audiosAleatorios[this.randomAudioIndex]);
            this.randomAudio.volume = this.volume;
            this.randomAudio.play();
            this.nextAudio();
          }
        }, 60000);
      }
    }
    else {
      this.yogaAudio.pause();
      if (this.randomAudioTimer) {
        clearInterval(this.randomAudioTimer);
        this.randomAudioTimer = undefined;
      }
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

  public nextPose(): void {
    this.poseIndex++;
  }

  public previousPose(): void {
    this.poseIndex--;
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
        alarmInitRutina.volume = 0.2;
        alarmInitRutina.play();
        this.currentStep  = ESYCO1012Step.Introduction;
        clearInterval(this.interval);
      }
    }, 1000)
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
        possiblePointsDescription: 'Actividad de emociones. No hay indicador para esta rutina.',
        pointsDescription: 'Actividad de emociones. No hay indicador para esta rutina.'
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

  private nextAudio() {
    this.randomAudioIndex++;
    if (this.randomAudioIndex >= this.audiosAleatoriosDefault.length) {
      this.randomAudioIndex = 0;
    }
  }

  regresar() {
    this.router.navigateByUrl(`/usuario`)
    .then(() => {
      window.location.reload();
    });
  }
  // #endregion Funciones privadas con interacción con la API
  // #endregion Funciones privadas
}

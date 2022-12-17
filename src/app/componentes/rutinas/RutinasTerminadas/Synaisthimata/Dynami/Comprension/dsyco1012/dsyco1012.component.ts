import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

// #region Tipos locales
enum DSYCO1012Step {
  Instructions,
  Introduction,
  RelationOfEmotions,
  EmotionsAffectionsCases,
  End
}

interface IImageEmotionAffection {
  imageUrl: string;
  affections: string[];
  emotion: string;
}

interface ICaseEmotionsAffection {
  text: string;
  basicEmotions: string[];
  secondaryEmotions: string[];
  affections: string[];
}

interface IEmotionAffectionCheckbox {
  name: string;
  checked: boolean;
}
// #endregion Tipos locales

@Component({
  selector: 'app-dsyco1012',
  templateUrl: './dsyco1012.component.html',
  styleUrls: ['./dsyco1012.component.css']
})
export class Dsyco1012Component implements OnInit {

  // #region Variables públicas de solo-lectura
  public readonly scenarioMinIndex: number = 0;
  public readonly scenarioMaxIndex: number = 13;
  public readonly imagesDirectory: string = '../assets/img/emociones';
  // #endregion públicas privadas de solo-lectura

  // #region Variables privadas de solo-lectura
  private readonly emocionesBasicasDefault: string[] = ["Alegría", "Enfado", "Miedo", "Tristeza", "Sorpresa", "Asco", "Confianza", "Interés"];
  private readonly emocionesSecundariasDefault: string[] = ["Vergüenza", "Culpa", "Bochorno", "Satisfacción", "Desprecio", "Entusiasmo", "Complacencia", "Orgullo", "Placer"];
  private readonly afeccionesDefault1: string[] = ['Generosidad', 'Agradecimiento', 'Bondad', 'Amabilidad', 'Integridad', 'Honestidad', 'Templanza', 'Serenidad'];
  private readonly afeccionesDefault2: string[] = ['Compasión', 'Aceptación', 'Benevolencia', 'Empatía', 'Armonía', 'Humildad', 'Autonomía'];
  private readonly casesDefault: string[] = [
    'Alberto no tiene templanza. Cada vez que la maestra lo corrige durante la clase, él se enoja mucho.',
    'Un niño de mi salón copió en el examen. Este niño no es honesto.',
    'Mi prima no le agradeció a sus papás por su regalo de cumpleaños.',
    'No tengo serenidad, me siento intranquilo y agitado, que hasta mi cara se pone roja como un tomate.',
    'Tengo un amigo muy inteligente pero él no se pone en mi lugar cuando le explico que me da un miedo terrible los insectos. Le falta empatía.',
    'Tengo un primo que es muy irresponsable, nunca recoge sus cosas, ni tan siquiera su plato de comida, ni sus juguetes.',
    'Hugo es un niño al que le falta compasión porque siempre que ve a un perrito en la calle lo patea.',
    'A un señor se le cayó su cartera, pero él no se dio cuenta. Otra persona que vio lo que había pasado tomó la cartera, pero no se la devolvió al señor.',
    'Una vecina no le devolvió a mi hermanita un libro que le prestó. Le falta integridad a esa persona.',
    'Un señor llegó tarde a una reunión y no fue honesto, dio muchas excusas y no admitió que había salido tarde y sabía que iba a llegar después de la hora indicada.',
    'Conozco a un niño que dice mentiras, no es sincero.',
    'Le preguntamos a una compañera si quería ir al museo por la tarde pero ella no contestó, dejó que otra compañera respondiera por ella. No tiene autonomía.',
    'Burlarse de otra persona por ser discapacitado.',
    'Colarse en una fila del banco, tienda, etc.'
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
  public currentStep: DSYCO1012Step;
  public emocionesBasicas: string[];
  public emocionesSecundarias: string[];
  public emocionesBasicasSeleccionadas: string[];
  public emocionesSecundariasSeleccionadas: string[];
  public afecciones1: string[];
  public afecciones2: string[];
  public scenarioIndex: number;
  public cases: ICaseEmotionsAffection[];

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

  public basicEmotionCheckboxes: IEmotionAffectionCheckbox[];
  public secondaryEmotionCheckboxes: IEmotionAffectionCheckbox[];
  public affectionCheckboxes1: IEmotionAffectionCheckbox[];
  public affectionCheckboxes2: IEmotionAffectionCheckbox[];

  public get DSYCO1012Step(): typeof DSYCO1012Step {
    return DSYCO1012Step;
  }
  // #endregion Variables públicas

  // #region Variables privadas
  // #endregion Variables privadas

  constructor(
    private _resultsService: ResultsService,
    private router: Router
  ) {
    this.imageEmotionAffections = this.resetImageEmotionAffections();
    this.emocionesBasicas = [...this.emocionesBasicasDefault];
    this.emocionesSecundarias = [...this.emocionesSecundariasDefault];
    this.emocionesBasicasSeleccionadas = [];
    this.emocionesSecundariasSeleccionadas = [];
    this.currentStep = DSYCO1012Step.Instructions;
    this.scenarioIndex = 0;
    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
    this.cases = this.setCaseEmotionAffections();
    this.basicEmotionCheckboxes = this.resetBasicEmotionCheckboxes();
    this.secondaryEmotionCheckboxes = this.resetSecondaryEmotionCheckboxes();
    this.affectionCheckboxes1 = this.resetAffectionCheckboxes1();
    this.affectionCheckboxes2 = this.resetAffectionCheckboxes2();

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
      case DSYCO1012Step.Instructions:
        this.currentStep  = DSYCO1012Step.Introduction;
        break;

      case DSYCO1012Step.Introduction:
        this.currentStep  = DSYCO1012Step.RelationOfEmotions;
        break;

      case DSYCO1012Step.RelationOfEmotions:
        this.currentStep  = DSYCO1012Step.EmotionsAffectionsCases;
        break;

      case DSYCO1012Step.EmotionsAffectionsCases:
        if (this.scenarioIndex < this.scenarioMaxIndex) {
          this.basicEmotionCheckboxes = this.resetBasicEmotionCheckboxes();
          this.secondaryEmotionCheckboxes = this.resetSecondaryEmotionCheckboxes();
          this.affectionCheckboxes1 = this.resetAffectionCheckboxes1();
          this.affectionCheckboxes2 = this.resetAffectionCheckboxes2();
          this.scenarioIndex++;
        }
        else {
          this.sendResult();
          this.currentStep  = DSYCO1012Step.End;
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

    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];
  }

  public dropSingle(event: CdkDragDrop<string[]>, emotion: string): string[] {
    event.currentIndex = 0;
    event.container.data = [];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.afecciones1 = [...this.afeccionesDefault1];
    this.afecciones2 = [...this.afeccionesDefault2];

    let imageEmotionAffection: IImageEmotionAffection | undefined
      = this.imageEmotionAffections.find(iea => iea.emotion === emotion);

    if (imageEmotionAffection) {
      imageEmotionAffection.affections = event.container.data;
    }
    return event.container.data;
  }

  public anyEmotionAffectionSelected(): boolean {
    return this.affectionCheckboxes1.some(ac1 => ac1.checked)
      || this.affectionCheckboxes2.some(ac2 => ac2.checked)
      || this.basicEmotionCheckboxes.some(bec => bec.checked)
      || this.secondaryEmotionCheckboxes.some(sec => sec.checked)
  }

  public allEmotionsHaveAffections(): boolean {
    return this.imageEmotionAffections.every(iea => iea.affections && iea.affections.length > 0)
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

  private setCaseEmotionAffections(): ICaseEmotionsAffection[] {
    return this.casesDefault.map(caseDescription => {
      return {
        affections: [],
        basicEmotions: [],
        secondaryEmotions: [],
        text: caseDescription
      }
    })
  }

  private resetBasicEmotionCheckboxes(): IEmotionAffectionCheckbox[] {
    return this.emocionesBasicasDefault.map(emotion => {
      return {
        checked: false,
        name: emotion
      }
    })
  }

  private resetSecondaryEmotionCheckboxes(): IEmotionAffectionCheckbox[] {
    return this.emocionesSecundariasDefault.map(emotion => {
      return {
        checked: false,
        name: emotion
      }
    })
  }

  private resetAffectionCheckboxes1(): IEmotionAffectionCheckbox[] {
    return this.afeccionesDefault1.map(affection => {
      return {
        checked: false,
        name: affection
      }
    });
  }

  private resetAffectionCheckboxes2(): IEmotionAffectionCheckbox[] {
    return this.afeccionesDefault2.map(affection => {
      return {
        checked: false,
        name: affection
      }
    });
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
        this.currentStep  = DSYCO1012Step.Introduction;
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
        possiblePointsDescription: 'Cantidad de relaciones causa-efecto mostradas por el sujeto',
        pointsDescription: 'Cantidad de relaciones causa-efecto mostradas por el sujeto'
      },
      {
        possiblePoints: 1,
        points: 1,
        possiblePointsDescription: 'Cantidad de soluciones emocionales propuestas por caso',
        pointsDescription: 'Cantidad de soluciones emocionales propuestas por caso'
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

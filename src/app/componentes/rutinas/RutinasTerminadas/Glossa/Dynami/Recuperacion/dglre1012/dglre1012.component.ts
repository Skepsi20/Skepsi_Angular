import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { dglre } from 'src/app/Models/rutinas/LenguajeComunicacion/dglre.model';
import { DGLRE1012Service } from 'src/app/services/rutinas/LenguajeComunicacion/dglre1012.service';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';

@Component({
  selector: 'app-dglre1012',
  templateUrl: './dglre1012.component.html',
  styleUrls: ['./dglre1012.component.css'],
  providers:[DGLRE1012Service]
})
export class DGLRE1012Component implements OnInit {
  //VARIABLES RESULTADOS INICIO
    private sessionId: any;
    private resultsTable: resultsWithDate = {
      date: '',
      studentSessionId: '',
      grade: 0,
      round: 0,
      level: 0,
      resultDetails:[{
        possiblePoints: 0,
        points: 0,
        possiblePointsDescription: '',
        pointsDescription: ''
      }]
    }
    private round: number = 0;
    private level: number = 0;
    private studentSessionId: string = '';
  //VARIABLES RESULTADOS FIN

  //Variables Drag and drop inicio
    @ViewChild('dropListContainer') dropListContainer?: ElementRef;
    dropListReceiverElement?: HTMLElement;
    dragDropInfo?: {
      dragIndex: number;
      dropIndex: number;
    };
  //Variables Drag and drop fin


  //Variables de rutina incio
    //Arreglos
    public cantidadAudios = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    public audiosController: Array<any> = [];
    public audiosControllerRandom: Array<any> = [];
    public arregloDeAudios: Array<dglre> = [];
    public arregloDeAudiosRandom: Array<dglre> = [];
    public audiosDOM: Array<dglre> = [];
    public auxDOM: any = 0;
    public tiempoAudiosDOM: boolean = true;
    public tiempoAudiosDOMSinImagen: boolean = false;
    public reproducirAudios = false;


    //Temporizador
    timeLeft: number = 10;
    interval:any;

  //Variables de rutina fin



  //Variables a acomodar
  public respuestas : Array<string> = [];
  public calificacion : number = 0;
  public calificacionVista: number = 0;
  public cantidadAudiosVista: number = 0;
  public resultados: boolean = false;
  public dragAndDrop: boolean = false;
  public instrucciones : boolean = true;
  public audiosAcotadasRandomDOM : Array<dglre> = [];

  constructor(
    private _dglreService: DGLRE1012Service,
    private _resultsService: ResultsService
    ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  statusUpdate(){
    this._resultsService.addStatus()
    .subscribe(
      (success)=>{
        console.log("Actividad actualizada")
      },(error)=>{
        console.log(error);
      }
    )
  }

  instruccionesFunc(){
    if(this.timeLeft > 0){
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.timeLeft == 2){
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initRutAudio')
          );
          alarmInitRutina.play();
        }
      } else {
        this.instrucciones  = false;
        this.reproducirAudios = true;
        clearInterval(this.interval);
      }
    },1000)
  }

  Inicializacion(){
    //Limpiar variables
    this.resultados = false;
    this.audiosController = [];
    this.tiempoAudiosDOMSinImagen = false;
    this.arregloDeAudios = [];
    this.audiosDOM = [];
    this.audiosControllerRandom = [];

    //Instrucciones
    this.instruccionesFunc();

    //Traer todos los sonidos
    this.audiosController = this._dglreService.getAudios();

    //Desordenar todos los sonidos
    this.audiosControllerRandom = this.arregloRandom(this.audiosController.length, this.audiosControllerRandom, this.audiosController);

    //Acotar sonidos
    this.CreacionArreglos();
  }

  arregloRandom(cantidadDeAudios: any, arregloDestino:any, arregloFuente: any){
    var valor = cantidadDeAudios;
    var fuente = arregloFuente;
    var destino = arregloDestino;
    var arregloRandom = [];
    for (let index = 0; index < valor; index++) {
      arregloRandom[index] = index;
    }
    arregloRandom.sort(() => Math.random() - 0.2);
    for (let index = 0; index < valor; index++) {
      destino[index] = fuente[arregloRandom[index]];
    }
    return destino;
  }

  CreacionArreglos(){
    //Imagenes desordenadas listas para mostrar a memorizar
    for (let index = 0; index < this.cantidadAudios[this.level]; index++) {
      this.arregloDeAudios[index] = this.audiosControllerRandom[index];
    }
    //Imagenes desordenadas para mostrar en drag and drop
    this.arregloDeAudiosRandom = this.arregloRandom(this.cantidadAudios[this.level], this.arregloDeAudiosRandom, this.arregloDeAudios);
    setTimeout(()=>{
      this.audiosParaDOM();
    }, 4000);
  }

  audiosParaDOM(){
      var audio = new Audio();
      var aux = 0;
      this.auxDOM = aux;
      if(this.auxDOM == 0){
        this.auxDOM = "Listo?";
      }
      var tiempo = setInterval(()=>{
        if(aux < this.cantidadAudios[this.level]){
          this.audiosDOM[0] = this.arregloDeAudios[aux];
          console.log(this.audiosDOM[0])
          audio.src = this.audiosDOM[0].audio;
          audio.load();
          audio.play();
          aux++;
          this.auxDOM = "Audio: "+aux;
        }else if(aux >= this.cantidadAudios[this.level]){
          audio.pause();
          clearInterval(tiempo);
          this.tiempoAudiosDOM = false;
          this.tiempoAudiosDOMSinImagen = true;
          this.auxDOM = "";
          this.audiosParaDOMSinImagen();
        }
      },8000);
  }

  audiosParaDOMSinImagen(){
    var audio = new Audio();
    var aux = 0;
    this.auxDOM = aux;
    if(this.auxDOM == 0){
      this.auxDOM = "Repetición:";
    }
    var tiempo = setInterval(()=>{
      if(aux < this.cantidadAudios[this.level]){
        this.audiosDOM[0] = this.arregloDeAudios[aux];
        console.log(this.audiosDOM[0])
        audio.src = this.audiosDOM[0].audio;
        audio.load();
        audio.play();
        aux++;
        this.auxDOM = "Audio: "+aux;
      }else if(aux >= this.cantidadAudios[this.level]){
        audio.pause();
        clearInterval(tiempo);
        this.tiempoAudiosDOM = false;
        this.tiempoAudiosDOMSinImagen = true;
        this.dragAndDrop = true;
        this.auxDOM = "";
      }
    },8000);
  }

  revisar(){
    var porcentaje = 0;
    for (let index = 0; index < this.cantidadAudios[this.level]; index++) {
      if(this.respuestas[index] == this.arregloDeAudios[index].nombre){
        this.calificacion++;
      }
    }
    this.cantidadAudiosVista = this.cantidadAudios[this.level];
    this.calificacionVista = this.calificacion;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;

      //Grade
      var partialGrade = ((this.calificacion/this.cantidadAudios[this.level])*100);

      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

      //LLENADO DE TABLA RESULTS FIN

      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.cantidadAudios[this.level];

      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;

      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de sonidos escuchados";

      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de sonidos memorizadas";

      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN

    porcentaje = this.cantidadAudios[this.level] * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.resultados = true;
      this.tiempoAudiosDOM = true;
      this.dragAndDrop = false;
      this.tiempoAudiosDOMSinImagen = false;
    }else{
      this.cantidadAudios = this.cantidadAudios;
      this.resultados = true;
      this.tiempoAudiosDOM = true;
      this.dragAndDrop = false;
      this.tiempoAudiosDOMSinImagen = false;
    }
    this.calificacion = 0;
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.arregloDeAudiosRandom, dragIndex, dropIndex);
    }

    //Asignacion de orden de respuestas a arreglo de respuestas
    for (let index = 0; index < this.cantidadAudios[this.level]; index++) {
      this.respuestas[index] = this.arregloDeAudiosRandom[index].nombre;
    }
    console.log(this.respuestas);
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;
    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );
    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;
    if (!receiverElement) {
      return;
    }
    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }
    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }


  //RESULTADOS INICIO
  
  getSession(){
    this._resultsService.getSession()
    .subscribe(
      (success)=>{
        if(success){
          this.sessionId = success.id;
          this.getStudentSessions();
        }else{
          //TODO: show message not session available
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  getStudentSessions(){
    this._resultsService.getStudentSessions()
    .subscribe(
      (success)=>{
        if(success){
          this.studentSessionId = success.id;
          if(success.results[success.results.length-1]){
            this.level = success.results[success.results.length-1].level-1;
            //this.contadorReactivos = this.level;
            this.round = success.results[success.results.length-1].round;
          }else{
            this.level = 0;
            this.round = 0;
          }
          this.Inicializacion();
        }
        else{
          this._resultsService.addStudentSessions(this.sessionId)
          .subscribe(
            (success)=>{
              this.studentSessionId = success.id;
              this.Inicializacion();
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

  addResult(results: resultsWithDate){
    this._resultsService.addResults(results)
    .subscribe(
      (successResponse)=>{
        console.log("subida correcta")
    },
    (error)=>{
      console.log("ERROR",error)
    });
  }
  
}

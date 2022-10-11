import { Component, OnInit} from '@angular/core';
import { dgnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/dgnre.model';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { DGNRE1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Recuperacion/dgnre1012.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';

@Component({
  selector: 'dgnre1012',
  templateUrl: './dgnre1012.component.html',
  styleUrls: ['./dgnre1012.component.css'],
  providers:[DGNRE1012Service]
})

export class DGNRE1012Component implements OnInit {
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


  public banderasArreglo : Array<dgnre> = [];
  public banderasParaAprender: Array<dgnre> =[];
  public banderaVista : Array<dgnre> = [];
  public banderasvista : Array<dgnre> = [];
  public items : Array<dgnre> = [];
  public respuestas : Array<string> = [];

  public banderasController: any;
  public banderaRandom: any;

  private aux : number = 0;
  public calificacion : number = 0;
  public calificacionVista: number = 0;
  public banderasVista : number = 0;
  public contadorReactivos : number = 0;

  public resultados : boolean = false;
  public rutina : boolean = true;
  public tiempoAprender : boolean = true;
  public instrucciones : boolean = true;

  public cantidadBanderas = [12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114];
  public reactivos = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57];

  timeLeft: number = 10;
  timeLeftTwo: number = 70;
  interval:any;
  intervalTwo:any;

  constructor(
    private _dgnreService: DGNRE1012Service,
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
      } else {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initRutAudio')
        );
        alarmInitRutina.play();
        this.instrucciones  = false;
        clearInterval(this.interval);
      }
    },1000)
  }

  Inicializacion(){
    this.banderasController = this._dgnreService.getBanderas();
    this.instruccionesFunc();
    this.resultados = false;
    this.tiempoAprender = true;
    this.aux = 0;
    this.rutina = true;
    this.banderasArreglo = [];
    this.banderaVista = [];
    this.banderasvista = [];
    this.items = [];
    this.respuestas = [];
    this.banderasParaAprender = [];
    this.timeLeftTwo = 70;
    this.banderaRandom = this.banderasController.sort( () => Math.random() - 0.5);
    this.CreacionArreglos(this.cantidadBanderas[this.level], this.banderaRandom);
    this.aprender();
    this.mostrar(0);
  }

  CreacionArreglos(numero : number, banderaFuncion: any){
    for (let index = 0; index < numero; index++) {
      this.banderasArreglo[index] = banderaFuncion[index];
    }
    for(let index = 0; index < numero; index++){
      this.items[index] = banderaFuncion[index];
      if(index<(this.reactivos[this.contadorReactivos])){
        this.banderasArreglo[index].estado = 'si';
        this.banderasParaAprender.push(this.items[index]);
      }else{
        this.banderasArreglo[index].estado = 'no';
      }
    }
    this.items.sort( () => Math.random() - 0.2);
    console.log("Items " , this.items);
    console.log("Banderas para aprender", this.banderasParaAprender);
  }

  aprender(){
    if(this.timeLeftTwo > 0){
      clearInterval(this.intervalTwo);
    }
    this.intervalTwo = setInterval(() => {
      if(this.timeLeftTwo > 0) {
        this.timeLeftTwo--;
      } else {
        this.tiempoAprender  = false;
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initEjerAudio')
          );
          alarmInitRutina.play();
        clearInterval(this.intervalTwo);
      }
    },1000)
  }

  mostrar(valor : number){
    
    if(valor < this.cantidadBanderas[this.level]){
      this.banderaVista[0] = this.items[valor];
    }else if(valor == this.cantidadBanderas[this.level]){
      this.revisar();
      this.resultados = true;
      this.rutina = false;
    }
  }

  funcionUno(valor : any){
    this.aux++;
    if(valor == 'si'){
      this.respuestas.push('si');
    }
    else if(valor == 'no'){
      this.respuestas.push('no');
    }
    this.mostrar(this.aux);
    console.log("Respuestas -> "+this.respuestas);
  }

  revisar(){
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

    var porcentaje = 0;
    for (let index = 0; index < this.cantidadBanderas[this.level]; index++) {
      if(this.respuestas[index] == this.items[index].estado){
        this.calificacion++;
      }
    }
    this.banderasVista = this.cantidadBanderas[this.level];
    this.calificacionVista = this.calificacion;


    //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;

      //Grade
      var partialGrade = (this.calificacion/this.cantidadBanderas[this.level])*100;
      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

    //LLENADO DE TABLA RESULTS FIN

    //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.cantidadBanderas[this.level];

      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;

      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de banderas mostradas";

      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de banderas memorizadas";

      //Metodo para crear resultado
      this.addResult(this.resultsTable);
    //LLENADO DE TABLA RESULTS DETAILS FIN



    porcentaje = this.cantidadBanderas[this.level] * .6;
    if(this.calificacion >= porcentaje){
      //Results level inicio
      this.level++;
      this.contadorReactivos++;
      //Results level fin
      this.rutina = true;
      this.resultados = true;
    }else{
      this.rutina = true;
      this.resultados = true;
    }
    this.calificacion = 0;
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
            this.contadorReactivos = this.level;
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
    },
    (error)=>{
      console.log("ERROR",error)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { egnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/egnre.model';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { EGNRE1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Recuperacion/egnre1012.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { Router } from '@angular/router';

@Component({
  selector: 'app-egnre1012',
  templateUrl: './egnre1012.component.html',
  styleUrls: ['./egnre1012.component.css'],
  providers:[EGNRE1012Service]
})
export class EGNRE1012Component implements OnInit {
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

  public banderasController: any;
  public banderasControllerRandom: any;
  public cantidadBanderas = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  public banderasAcotadas : Array<egnre> = [];
  public nombresAcotados : Array<string> = [];
  public nombresAcotadosRandom : Array<string> = [];
  public banderasAcotadasRandom : Array<egnre> = [];
  public banderasAcotadasRandomDOM : Array<egnre> = [];
  public tiempoAprender : boolean = false;
  public banderaVista : Array<egnre> = [];
  public banderaVistaDos : Array<string> = [];
  public resultados : boolean = false;
  public banderasDOM : boolean = true;
  private posicionDeBandera : number = 0;
  private posicionDeBanderaDos : number = 0;
  public respuestasNombres : Array<string> = [];
  public respuestasBanderas : Array<string> = [];
  public contador1 : number = 0;
  public contador2 : number = 0;
  public calificacion : number = 0;
  public aciertosDOM : number = 0;
  public calificacionDOM : number = 0;
  public instrucciones : boolean = true;
  public temp: number = 0;

  timeLeft: number = 10;
  timeLeftTwo: number = 120;
  timeLeftTree: number = 15;
  interval:any;
  intervalTwo:any;
  intervalTree:any;

  constructor(
    private _egnreService: EGNRE1012Service,
    private _resultsService: ResultsService,
    private router: Router
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
        alarmInitRutina.volume = 0.2;
        alarmInitRutina.play();
        this.instrucciones  = false;
        this.aprender();
        clearInterval(this.interval);
      }
    },1000)
  }

  Inicializacion(){
    this.banderasController = this._egnreService.getBanderas();
    this.instruccionesFunc();
    this.tiempoAprender = false;
    this.resultados = false;
    this.banderasDOM = true;
    this.calificacion = 0;
    this.contador1 = 0;
    this.contador2 = 0;
    this.calificacionDOM = 0;
    this.aciertosDOM = 0;
    this.temp = 0;
    this.posicionDeBandera = 0;
    this.posicionDeBanderaDos = 0;
    this.banderasAcotadas = [];
    this.nombresAcotados = [];
    this.nombresAcotadosRandom = [];
    this.banderasAcotadasRandom = [];
    this.respuestasBanderas = [];
    this.respuestasNombres = [];
    this.banderaVista = [];
    this.banderaVistaDos = [];
    this.timeLeftTwo = 120;
    this.banderasControllerRandom = this.banderasController.sort( () => Math.random() - 0.2);
    this.CreacionArreglos(this.cantidadBanderas[this.level], this.banderasControllerRandom);
  }

  CreacionArreglos(numero : number, banderaFuncion: any){
    for(let index = 0; index < numero; index++) {
      this.banderasAcotadas[index] = banderaFuncion[index];
      this.nombresAcotados.push(banderaFuncion[index].nombre);
    }
    this.nombresAcotadosRandom = this.nombresAcotados.sort(() => Math.random() - 0.5);
    this.banderasAcotadasRandom = this.banderasAcotadas.sort(() => Math.random());
    this.arregloRandom(this.cantidadBanderas[this.level]);
    this.aprender();
    this.tiempoAprender  = true;
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
        this.mostrarBanderas(0);
        clearInterval(this.intervalTwo);
      }
    },1000)
  }

  arregloRandom(valor: number){
    let arregloRandom : Array<number> = [];
    for (let index = 0; index < valor; index++) {
      arregloRandom[index] = index;
    }
    arregloRandom.sort(() => Math.random() - 0.5);
    for (let index = 0; index < valor; index++) {
      this.banderasAcotadasRandomDOM[index] = this.banderasAcotadasRandom[arregloRandom[index]];
    }
  }


  mostrarBanderas(valor: number){
    this.nombresAcotadosRandom.sort( () => Math.random() - 0.5);
    if(valor < this.cantidadBanderas[this.level]){
      this.banderaVista[0] = this.banderasAcotadasRandomDOM[valor];
      this.timeLeftTree = 15;
      this.tiempoParaResponder();
    }
    else if(valor == this.cantidadBanderas[this.level]){
      this.mostrarBanderasDos(0);
      this.banderasDOM = false;
    }
  }

  mostrarBanderasDos(valor : number){
    if(valor < this.cantidadBanderas[this.level]){
      this.banderaVistaDos[0] = this.nombresAcotadosRandom[valor];
      this.timeLeftTree = 15;
      this.tiempoParaResponder();
    }
    else if(valor == this.cantidadBanderas[this.level]){
      this.revisar();
    }
  }

  tiempoParaResponder(){
    this.intervalTree = setInterval(() => {
      if(this.timeLeftTree > 0) {
        this.timeLeftTree--;
      } else {
        if(this.banderasDOM == true){
          clearInterval(this.intervalTree);
          this.respuestasNombresDOM(" ");
        }else{
          clearInterval(this.intervalTree);
          this.respuestasBanderasDOM(" ");
        }
      }
    },1000)
  }


  respuestasNombresDOM(respuesta: string){
    if(respuesta != " "){
      clearInterval(this.intervalTree);
    }
    this.posicionDeBandera++;
    this.respuestasNombres.push(respuesta);
    this.mostrarBanderas(this.posicionDeBandera);
  }

  respuestasBanderasDOM(respuesta: any){
    if(respuesta != " "){
      clearInterval(this.intervalTree);
    }
    this.posicionDeBanderaDos++;
    this.respuestasBanderas.push(respuesta);
    this.mostrarBanderasDos(this.posicionDeBanderaDos);
  }




  revisar(){
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.volume = 0.2;
    alarmInitRutina.play();

    var porcentaje = 0;
    for (let index = 0; index < this.cantidadBanderas[this.level]; index++) {
      if(this.respuestasNombres[index] == this.banderasAcotadasRandomDOM[index].nombre){
        this.contador1++;
      }
      if(this.respuestasBanderas[index] == this.nombresAcotadosRandom[index]){
        this.contador2++;
      }
    }
    this.calificacion = this.contador1+this.contador2;
    this.aciertosDOM = this.cantidadBanderas[this.level]*2;
    this.calificacionDOM = this.calificacion;



    //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;

      //Grade
      var partialGrade = ((this.calificacion/this.cantidadBanderas[this.level])*100)/2;
      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

    //LLENADO DE TABLA RESULTS FIN

    //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.cantidadBanderas[this.level]*2;

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
      this.level++;
      this.banderasDOM = false;
      this.resultados = true;
    }else{
      this.banderasDOM = false;
      this.resultados = true;
    }
    this.calificacion = 0;
  }



/*


  revisar(){
    var porcentaje = 0;
    for(let index = 0; index < this.cantidadBanderas; index++){
      if(this.respuestasNombres[index] == this.banderasAcotadasRandomDOM[index].nombre){
        this.contador1++;
      }
      if(this.respuestasBanderas[index] == this.nombresAcotadosRandom[index]){
        this.contador2++;
      }
    }
    this.contador = this.contador1+this.contador2;

    this.aciertosDOM = this.cantidadBanderas*2;
    this.calificacionDOM = this.contador;

    porcentaje = (this.aciertosDOM) * .6;
    if(this.contador >= porcentaje){
      this.cantidadBanderas = this.cantidadBanderas + 3;
      this.banderasDOM = false;
      this.resultados = true;
    }else{
      this.cantidadBanderas = this.cantidadBanderas;
      this.banderasDOM = false;
      this.resultados = true;
    }
    this.contador = 0;
  }
 */

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
}


import { Component, OnInit } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { dmaco } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/dmaco.mode';
import { Dmaco1012Service } from 'src/app/services/rutinas/LogicoMatematico/dmaco1012.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dmaco1012',
  templateUrl: './dmaco1012.component.html',
  styleUrls: ['./dmaco1012.component.css'],
  providers: [Dmaco1012Service],
})
export class Dmaco1012Component implements OnInit {
  public nombreRutina = '1012DMACO';
  public intentosTotales = 0;
  public aciertosTotales = 0;

  //VARIABLES RESULTADOS INICIO
  private sessionId: any;
  private resultsTable: resultsWithDate = {
    date: '',
    studentSessionId: '',
    grade: 0,
    round: 0,
    level: 0,
    resultDetails: [
      {
        possiblePoints: 0,
        points: 0,
        possiblePointsDescription: '',
        pointsDescription: '',
      },
    ],
  };
  private round: number = 0;
  private level: number = 0;
  private studentSessionId: string = '';
  //VARIABLES RESULTADOS FIN
  cantidadReactivos = 0;
  calificacion = 0;

  //Variables ejercicio operaciones
  operacionUno = '';
  operacionDos = '';
  operaciones = ['+','-','*','/',];
  operadores = ['>','<','=']
  operacion = '';
  operacion1 = '';
  operacion2 = '';
  contadorAciertosEj1 = 0;
  resultado1 = 0;
  resultado2 = 0;
  num1:any;
  num2:any;
  num3:any;
  num4:any;

  //Variables ejercicio areas y perimetros 
  areasYPerimetrosService: Array<any> = [];
  contadorAciertosEj2 = 0;
  figuraUno:any;
  figuraDos:any;

  //Variables de dinero 
  dineroService: any;
  dineroArray: Array<any> = [];
  cantidadDeDinero: number = 0;
  unidades: number = 0; 
  decenas: number = 0;
  centenas: number = 0;
  contadorDineroUno = 0;
  cantidadDineroDos = 0;
  contadorDineroDos = 0;

  //Temporizadores
  timeInstructions: number = 1;
  //10
  intervalInstructions:any;

  timerDescanso: number = 6000;
  intervalDescanso:any;
  
  timerEjerUno: number = 30;
  //300
  ejerUnoDescanso:any;
  
  timerEjerDos: number = 30;
  //300
  ejerDosDescanso:any;

  timerEjerTres: number = 15;
  //120
  ejerTresDescanso:any;
  
  timerEjerCuatro: number = 15;
  //120
  ejerCuatroDescanso:any;



  //Variables DOM
  instruccionesDOM = true;
  ejercicioOperaciones = false;
  ejercicioAreas = false;
  ejercicioDineroUno = false;
  ejercicioDineroDos = false;
  descansoDOM = false;
  correctoDOM = false;
  incorrectoDOM = false;
  calificacionDOM = 0;
  cantidadReactivosDOM = 0;

  public formCantDinero = new FormControl(0);

  constructor(
    private _dmacoService: Dmaco1012Service,
    public datepipe: DatePipe,
    private _resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {   
    this.areasYPerimetrosService = this._dmacoService.getAreasYPerimetros();
    this.dineroService = this._dmacoService.dineroService;
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
  
  Inicializacion(){
    this.instrucciones();
  }
    
   // INSTRUCCIONES
   instrucciones(){
    if(this.timeInstructions > 0){
      clearInterval(this.intervalInstructions);
    }
    this.intervalInstructions = setInterval(() => {
      if(this.timeInstructions > 0) {
        this.timeInstructions--;
      } else {
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initRutAudio')
          );
          //alarmInitRutina.play();
          clearInterval(this.intervalInstructions);
          this.ejercicioOperacionesFunc();
          this.instruccionesDOM = false;
          this.ejercicioOperaciones = true;
          this.ejercicioUno();
      }
    },1000)
  }
  
  ejercicioOperacionesFunc(){
    //Math.floor(Math.random() * (max - min) + min);
    this.num1 = Math.floor(Math.random() * (12 - 0) + 1)
    this.num2 = Math.floor(Math.random() * (12 - 0) + 1)
    const operacion1 = Math.floor(Math.random() * (4 - 1) + 1)
    const operacion2 = Math.floor(Math.random() * (4 - 1) + 1)
    this.num3 = Math.floor(Math.random() * (12 - 0) + 1)
    this.num4 = Math.floor(Math.random() * (12 - 0) + 1)
    this.operacion1 = this.operaciones[operacion1];
    this.operacion2 = this.operaciones[operacion2];
    if(this.num2>this.num1){
      const aux = this.num2;
      this.num2 = this.num1;
      this.num1 = aux;
    }
    if(this.num4>this.num3){
      const aux = this.num4;
      this.num4 = this.num3;
      this.num3 = aux;
    }
    this.operacionUno = this.num1+this.operacion1+this.num2;
    this.operacionDos = this.num3+this.operacion2+this.num4;
  }

  operacionSeleccionada(){
    if(this.operacion1 == '+'){ this.resultado1 = this.num1 + this.num2; }
    else if(this.operacion1 == '-'){ this.resultado1 = this.num1 - this.num2; }
    else if(this.operacion1 == '*'){ this.resultado1 = this.num1 * this.num2; }
    else if(this.operacion1 == '/'){ this.resultado1 = this.num1 / this.num2; }
    if(this.operacion2 == '+'){ this.resultado2 = this.num3 + this.num4; }
    else if(this.operacion2 == '-'){ this.resultado2 = this.num3 - this.num4; }
    else if(this.operacion2 == '*'){ this.resultado2 = this.num3 * this.num4; }
    else if(this.operacion2 == '/'){ this.resultado2 = this.num3 / this.num4; }
  }

  correct(){
    console.log("CORRECTO")
    this.correctoDOM = true;
    this.incorrectoDOM = false;
    setTimeout(()=>{
      this.correctoDOM = false;
    }, 1000);
  }
  incorrect(){
    console.log("INCORRECTO")
    this.correctoDOM = false;
    this.incorrectoDOM = true;
    setTimeout(()=>{
      this.incorrectoDOM = false;
    }, 1000);
  }

  comprobarOperacion(){
    if(this.operacion == '>' && (this.resultado1 > this.resultado2)){
      this.contadorAciertosEj1++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '<' && (this.resultado1 < this.resultado2)){
      this.contadorAciertosEj1++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '=' && (this.resultado1 == this.resultado2)){
      this.contadorAciertosEj1++;
      this.cantidadReactivos++;
      this.correct();
    }else{
      this.cantidadReactivos++;
      this.incorrect();
    }
    this.operacion = '';
    this.ejercicioOperacionesFunc();
  }


  ejercicioUno(){
    if(this.timerEjerUno > 0){
      clearInterval(this.ejerUnoDescanso);
    }
    this.ejerUnoDescanso = setInterval(() => {
      if(this.timerEjerUno > 0) {
        this.timerEjerUno--;
      } else {
        clearInterval(this.ejerUnoDescanso);
        this.areasYPerimetrosInicializaion();
        this.ejercicioOperaciones = false;
        this.ejercicioAreas = true;
        this.ejercicioDos();
      }
    },1000)
  }

  ejercicioDos(){
    if(this.timerEjerDos > 0){
      clearInterval(this.ejerDosDescanso);
    }
    this.ejerDosDescanso = setInterval(() => {
      if(this.timerEjerDos > 0) {
        this.timerEjerDos--;
      } else {
        clearInterval(this.ejerDosDescanso);
        this.ejercicioAreas = false;
        this.ejercicioDineroUno = true;
        this.dineroUno();
        this.ejercicioTres();
      }
    },1000)
  }

  ejercicioTres(){
    if(this.timerEjerTres > 0){
      clearInterval(this.ejerTresDescanso);
    }
    this.ejerTresDescanso = setInterval(() => {
      if(this.timerEjerTres > 0) {
        this.timerEjerTres--;
      } else {
        clearInterval(this.ejerTresDescanso);
        this.ejercicioCuatro();
        this.ejercicioDineroUno = false;
        this.ejercicioDineroDos = true;
        this.dineroDos();
      }
    },1000)
  }

  ejercicioCuatro(){
    if(this.timerEjerCuatro > 0){
      clearInterval(this.ejerCuatroDescanso);
    }
    this.ejerCuatroDescanso = setInterval(() => {
      if(this.timerEjerCuatro > 0) {
        this.timerEjerCuatro--;
      } else {
        clearInterval(this.ejerCuatroDescanso);
        this.ejercicioDineroDos = false;
        this.revisar();
      }
    },1000)
  }

  areasYPerimetrosInicializaion(){
    console.log(this.areasYPerimetrosService)
    const imagen1 = Math.floor(Math.random() * (47 - 0) + 0)
    const imagen2 = Math.floor(Math.random() * (47 - 0) + 0)
    const ejercicio = Math.floor(Math.random() * (2 - 1) + 1)
    this.figuraUno = this.areasYPerimetrosService[imagen1];
    this.figuraDos = this.areasYPerimetrosService[imagen2];    
  }

  comprobarayp(){
    const perimetro1 = this.figuraUno.perimetro;
    const perimetro2 = this.figuraDos.perimetro;

    if(this.operacion == '>' && (perimetro1 > perimetro2)){
      this.contadorAciertosEj2++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '<' && (perimetro1 < perimetro2)){
      this.contadorAciertosEj2++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '=' && (perimetro1 == perimetro2)){
      this.contadorAciertosEj2++;
      this.cantidadReactivos++;
      this.correct();
    }else{
      this.cantidadReactivos++;
      this.incorrect();
    }
    this.areasYPerimetrosInicializaion();
  }

  dineroUno(){
    this.cantidadDeDinero = 0;
    const cantidadImagenes = Math.floor(Math.random() * (10 - 1) + 1);
    for (let index = 0; index < cantidadImagenes; index++) {
      var imagenRandom = Math.floor(Math.random() * (this.dineroService.length - 0) + 0);
      this.dineroArray.push(this.dineroService[imagenRandom]);
      this.cantidadDeDinero = this.cantidadDeDinero + this.dineroService[imagenRandom].cantidad;
    }   
  }

  comprobarDineroUno(){
    const centenas = (this.cantidadDeDinero%1000-this.cantidadDeDinero%100)/100;
    const decenas = (this.cantidadDeDinero%100-this.cantidadDeDinero%10)/10;;
    const unidades = this.cantidadDeDinero%10;
    
    if(centenas == this.centenas && this.decenas == decenas && this.unidades == unidades){
      this.contadorDineroUno++;
      this.cantidadReactivos++;
      this.correct();
    }else{
      this.cantidadReactivos++;
      this.incorrect();
    }    
    this.dineroArray = [];
    this.unidades = 0;
    this.decenas = 0;
    this.centenas = 0;
    this.dineroUno();
  }

  dineroDos(){
    this.dineroArray = [];
    this.dineroUno();
    const variante = Math.floor(Math.random() * (30 - 0) + 0);


    const sumaOResta = Math.floor(Math.random() * (3 - 0) + 0);
    console.log(sumaOResta,"SUMA O RESTA")

    console.log("Cantidad de dinero", this.cantidadDeDinero)
    console.log("VARIANTE", variante)
    if(sumaOResta == 0){
      if(this.cantidadDeDinero - variante < 0){
        this.cantidadDineroDos = 5;
      }else{
        this.cantidadDineroDos = this.cantidadDeDinero - variante;
      }
    }else if(sumaOResta == 1){
      this.cantidadDineroDos = this.cantidadDeDinero + variante;
    }else {
      this.cantidadDineroDos = this.cantidadDeDinero;
    }
  }

  comprobarDineroDos(){
    if(this.operacion == '>' && (this.cantidadDeDinero > this.cantidadDineroDos)){
      this.contadorDineroDos++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '<' && (this.cantidadDeDinero < this.cantidadDineroDos)){
      this.contadorDineroDos++;
      this.cantidadReactivos++;
      this.correct();
    }else if(this.operacion == '=' && (this.cantidadDeDinero == this.cantidadDineroDos)){
      this.contadorDineroDos++;
      this.cantidadReactivos++;
      this.correct();
    }else{
      this.cantidadReactivos++;
      this.incorrect();
    }
    this.dineroDos();
  }

  descanso(){
    if(this.timerDescanso > 0){
      clearInterval(this.intervalDescanso);
    }
    this.intervalDescanso = setInterval(() => {
      if(this.timerDescanso > 0) {
        this.timerDescanso--;
      } else {
        this.Inicializacion();
        clearInterval(this.intervalDescanso);
        this.calificacionDOM = 0;
        this.cantidadReactivosDOM = 0;
      }
    },1000)
  }

  revisar(){    
    this.descanso();
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();
    this.calificacion = this.contadorAciertosEj1 + this.contadorAciertosEj2 + this.contadorDineroUno + this.contadorDineroDos
    this.calificacionDOM = this.calificacion;
    this.cantidadReactivosDOM = this.cantidadReactivos;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/this.cantidadReactivos)*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.cantidadReactivos;
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles ejercicios resueltos";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de ejercicios contestados correctamente";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
    this.level++;
    this.calificacion = 0;
    this.cantidadReactivos = 0;
    this.descansoDOM = true;
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

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { DMAAN } from 'src/app/Models/rutinas/LogicoMatematico/Analisis/dmaan.model';
import { Dmaan1012Service } from 'src/app/services/rutinas/LogicoMatematico/dmaan1012.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';

@Component({
  selector: 'dmaan1012',
  templateUrl: './dmaan1012.component.html',
  styleUrls: ['./dmaan1012.component.css'],
  providers: [Dmaan1012Service],
})
export class Dmaan1012Component implements OnInit {

  public nombreRutina = '1012DMAAN';
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

  public operacionesController: any;
  public operacionesRandom: any;
  public resultOperacion = new FormControl(0);

  public contadorEjer: number = 0;
  public resultados: boolean = false;
  public rutina: boolean = true;

  private calificacion: number = 0;
  public calificacionVista: number = 0;

  public tiempoDescanso: boolean = true;
  public opcionesOper: Array<any> = [
    { oper: 'mayorq', simbolo: '>' },
    { oper: 'menorq', simbolo: '<' },
    { oper: 'igual', simbolo: '=' },
  ];
  public operador: any = { oper: 'operador', simbolo: '' };

  public vistaOperacion = new DMAAN([], '', '', []);
  public elemVacioOper: any;
  public inicioCrono: Date = new Date();

  public tiempoSegundosCrono = 60;
  public segundosDescanso = 15;
  public tiempoSegundosGeneral = 180;
  public tiempoSegundosInstrucciones = 2;

  public tTimerGeneral = 0;
  public tTimer = 0;
  public tTimerDescanso = 0;
  public tTimerInstrucciones = 0;

  public timerActivo: boolean = true;

  public resultadoEjer: Array<any> = [];

  public instrucciones: boolean = true;
  public banderaEjer1: boolean = true;
  public banderaEjer2: boolean = false;
  public banderaEjer3: boolean = false;
  public bandEjer4: boolean = false;

  public ejercActivo = 3;

  public listaCaras: any;
  public contenedorCaras: Array<any> = [];
  public listFigGeomController: any;
  public listFigGeomRand: any;
  public vistaCaras: Array<any> = [];
  public vistaEspacios: Array<any> = [];
  public vistaFigGeom: any;

  //Ejercicio3
  public fraccionesRand: Array<any> = [];
  public duplaCarasDado: Array<number> = [];
  public combinacionColores: any={R:'', G:'', B:''}
  public sliderGValue: number = 0;
  public fractionG: string = '';
  public sliderBValue: number = 0;
  public fractionB: string = '';
  public sliderRValue: number = 0;
  public fractionR: string = '';

  constructor(private _DMAANService: Dmaan1012Service,
    private _resultsService: ResultsService) {}

  ngOnInit(): void {
    //Instrucciones API
    setInterval(() => this.statusUpdate(), 30000);
    this.getSession();

    this.tTimerInstrucciones = this.tiempoSegundosInstrucciones;
    this.tTimerGeneral =
      this.tiempoSegundosGeneral + this.tiempoSegundosInstrucciones;

    this.initContEjerc();
    this.Inicializacion();
    let _conteoTiempo = timer(0, 1000).subscribe((_x) => {
      this.sonarAlarmas();
      this.tTimer--;
      this.tTimerGeneral--;
      this.tTimerInstrucciones--;
      if (this.tTimerInstrucciones == 0) {
        this.instrucciones = false;
        this.Inicializacion();
      }
      if (this.tTimer == 0) {
        this.timerActivo = false;
        switch (this.ejercActivo) {
          case 1:
            this.funcion1();
            break;
          case 2:
            this.funcion2();
            break;

          case 3:
            this.funcion3();
            break;

          default:
            break;
        }
      } else if (this.tTimer > 0) this.timerActivo = true;
      if (this.tTimerDescanso > 0) this.tTimerDescanso--;
    });
  }

  //StatusUpdate API
  statusUpdate() {
    this._resultsService.addStatus().subscribe(
      (success) => {
        console.log('Actividad actualizada');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //RESULTADOS INICIO
  getSession() {
    this._resultsService.getSession().subscribe(
      (success) => {
        if (success) {
          this.sessionId = success.id;
          this.getStudentSessions();
        } else {
          //TODO: show message not session available
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Datos Estudiante API
  getStudentSessions() {
    this._resultsService.getStudentSessions().subscribe(
      (success) => {
        if (success) {
          this.studentSessionId = success.id;
          if (success.results[success.results.length - 1]) {
            this.level = success.results[success.results.length - 1].level - 1;
            this.aciertosTotales = this.level;
            this.round = success.results[success.results.length - 1].round;
          } else {
            this.level = 0;
            this.round = 0;
          }
          this.Inicializacion();
        } else {
          this._resultsService.addStudentSessions(this.sessionId).subscribe(
            (success) => {
              this.studentSessionId = success.id;
              this.Inicializacion();
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log('ERROR', error);
      }
    );
  }

  //Reportar Resultados API
  addResult(results: resultsWithDate) {
    this._resultsService.addResults(results).subscribe(
      (successResponse) => {},
      (error) => {
        console.log('ERROR', error);
      }
    );
  }

  sonarAlarmas() {
    if (this.tTimer >= this.tiempoSegundosCrono) {
      if (this.tTimerGeneral >= this.tiempoSegundosGeneral - 1) {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initRutAudio')
        );
        alarmInitRutina.play();
      } else {
        let alarmInitEjer = <HTMLAudioElement>(
          document.getElementById('initEjerAudio')
        );
        alarmInitEjer.play();
      }
    }
    if (this.tTimer == 3) {
      let alarmFinEjer = <HTMLAudioElement>(
        document.getElementById('finEjerAudio')
      );
      alarmFinEjer.play();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  getFraction(value: number, sliderColor: string) {
    let fraction = this.formatFraction(value);
    switch (sliderColor) {
      case 'R':
        this.fractionR = fraction;

        break;
      case 'G':
        this.fractionG = fraction;
        break;
      case 'B':
        this.fractionB = fraction;
        break;
      default:
        break;
    }
    //if (fraction == 'NaN/Infinity') fraction = '';
    return fraction;
  }

  formatFraction(value: number) {
    switch (value) {
      case 0.33:
        return '1/3';
      case 0.66:
        return '2/3';
      case 0.17:
        return '1/6';
      case 0.001:
        return '0';
      case 1:
        return '1';
      case 0:
        return '';
      default:
        break;
    }
    var gcd = function (a: any, b: any): any {
      if (!b) return a;
      a = parseInt(a);
      b = parseInt(b);
      return gcd(b, a % b);
    };

    var fraction = value;
    var len = fraction.toString().length;

    var denominator = Math.pow(10, len - 2);
    var numerator = fraction * denominator;

    var divisor = gcd(numerator, denominator).toString();
    //var Fraction = require('fractional').Fraction

    numerator /= divisor;
    denominator /= divisor;
    return numerator.toFixed() + '/' + denominator.toFixed();
  }

  initContEjerc() {
    for (let index = 0; index < 3; index++) {
      this.resultadoEjer[index] = {
        aciertos: 0,
        intentos: 0,
      };
    }
  }

  Inicializacion() {
    this.resultados = false;
    this.tiempoDescanso = false;
    this.contadorEjer = 0;
    if (!this.instrucciones) {
    if (this.ejercActivo > 0 && this.ejercActivo < 4) this.resetTimerEjer();
    if (this.ejercActivo == 1) {
      this.operacionesController = this._DMAANService.getOperaciones();
      this.operacionesRandom = this.operacionesController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer1();
    } else if (this.ejercActivo == 2) {
      this.listFigGeomController = JSON.parse(
        JSON.stringify(this._DMAANService.getFigGeometrica())
      );
      this.listFigGeomRand = this.listFigGeomController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer2();
    } else if (this.ejercActivo == 3) {
      //this.fraccionesRand = this._DMAANService.getFracciones();
      this.fraccionesRand.sort(() => Math.random() - 0.5);
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer3();
    }
  }
  }

  crearVistaOperaciones() {
    let numRand = Math.floor(Math.random() * 3);
    this.operacionesRandom = this.operacionesController.sort(
      () => Math.random() - 0.5
    );
    this.vistaOperacion = this.operacionesRandom[0];
    this.elemVacioOper = this.vistaOperacion.operacion[numRand];

    this.vistaOperacion.operacion[numRand] = '?';
  }

  initListasFigGeo() {
    this.listFigGeomRand = this.listFigGeomController.sort(
      () => Math.random() - 0.5
    );
    this.contenedorCaras = [];
  }

  crearListasFigIrreg() {
    this.vistaCaras = [];
    this.vistaFigGeom = this.listFigGeomRand.pop();
    this.listaCaras = this.vistaFigGeom.setDeCaras;
    console.log('LC', this.listaCaras);
    this.listaCaras.forEach((element: any) => {
      this.vistaCaras.push(element);
    });

    for (let index = 0; index < 6; index++) {
      if (this.vistaCaras[index] == undefined) {
        let aux = '00';
        do {
          aux = Math.floor(1 + Math.random() * 19)
            .toString()
            .padStart(2, '00');
        } while (this.vistaCaras.find((element) => element == aux) >= 0);
        this.vistaCaras[index] = aux;
      }
    }
    this.vistaCaras.sort(() => Math.random() - 0.45);
    console.log('VC', this.vistaCaras);
  }

  crearDuplasDados() {
    let carasDado = [1, 2, 3, 4, 5, 6];
    this.duplaCarasDado = [];
    carasDado.sort(() => Math.random() - 0.45);
    this.duplaCarasDado.push(carasDado[0]);
    carasDado.sort(() => Math.random() - 0.45);
    this.duplaCarasDado.push(carasDado[1]);
  }

  crearRandomFraction(){
    var a= 0;
    var b=0;
    do {
      a=Math.floor(Math.random()*6);
      b=Math.floor(Math.random()*6);

    } while (b<=a || a<=0 || b<=0);
    //console.log('Test',a+'/'+b);
    //console.log('evaluate', eval(a+'/'+b) );


    return a+'/'+b;


  }

  crearCombinacionColores(){
    this.combinacionColores={
      R: this.crearRandomFraction(),
      G: this.crearRandomFraction(),
      B: this.crearRandomFraction()
    }

    console.log('Combinacion', this.combinacionColores);
    //console.log('R', eval(this.combinacionColores.R));


  }

  descanso() {
    console.log('Tiempo Rest General', this.tTimerGeneral);

    this.tTimerDescanso = this.segundosDescanso;
    this.tiempoDescanso = true;

    if (this.tTimerGeneral > 0) {
      var _tiempo = setTimeout(() => {
        if (this.ejercActivo > 0) this.ejercActivo++;
        if (this.ejercActivo == 4) this.ejercActivo = 1;
        this.tiempoDescanso = false;
        this.Inicializacion();
      }, this.segundosDescanso * 1000);
    } else {
      this.ejercActivo = 4;
      this.tiempoDescanso = false;
      this.getresultadosRutina();
      console.log('Aciertos T', this.aciertosTotales);
      console.log('Intentos T', this.intentosTotales);
      this.Inicializacion();
    }
  }

  getresultadosRutina() {
    for (const element of this.resultadoEjer) {
      this.intentosTotales += element.intentos;
      this.aciertosTotales += element.aciertos;
      console.log('Aciertos T', this.aciertosTotales);
      console.log('Intentos T', this.intentosTotales);
    }
  }

  esperar() {
    var _tiempo = setTimeout(() => {
      this.tiempoDescanso = false;
      this.Inicializacion();
    }, this.segundosDescanso * 1000);
  }

  resetTimerEjer() {
    this.timerActivo = true;
    this.tTimer = this.tiempoSegundosCrono + 1;
  }

  mostrarEjer1() {
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.timerActivo) {
      this.resultOperacion.setValue('');
      this.crearVistaOperaciones();
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer2() {
    this.initListasFigGeo();
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.timerActivo) {
      this.crearListasFigIrreg();
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer3() {
    //Compara tiempo con respecto a contador
    this.sliderRValue=0;
    this.sliderGValue=0;
    this.sliderBValue=0;


    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.timerActivo) {
      this.crearCombinacionColores();
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  funcion1() {
    let stringEntrada = this.resultOperacion.value.toString();
    console.log('vista', this.elemVacioOper);
    console.log('entrada', stringEntrada);
    if (stringEntrada == '*') stringEntrada = 'x';
    if (this.elemVacioOper == stringEntrada) {
      this.calificacion++;
    }
    console.log('Result:', this.resultOperacion.value);

    this.contadorEjer++;
    this.mostrarEjer1();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcion2() {
    console.log('Contendores:', this.contenedorCaras);
    this.contenedorCaras.forEach((item) => {
      if (this.listaCaras.find((cara: any) => cara == item)) {
        this.calificacion++;
      }
    });

    this.contadorEjer += this.listaCaras.length;
    console.log('contadorEjer', this.contadorEjer);

    this.mostrarEjer2();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcion3() {

    if(this.combinacionColores.R==this.fractionR) this.calificacion++;
    if(this.combinacionColores.G==this.fractionG) this.calificacion++;
    if(this.combinacionColores.B==this.fractionB) this.calificacion++;


    this.contadorEjer+=3;

    console.log("Aciertos"+this.calificacion+" : Intentos "+this.contadorEjer);


    this.mostrarEjer3();
  }

  revisar() {
    this.resultadoEjer[this.ejercActivo - 1].aciertos += this.calificacion;
    this.resultadoEjer[this.ejercActivo - 1].intentos += this.contadorEjer;
    this.calificacionVista = this.calificacion;
    console.log('RESULTADO: ' + this.calificacion + ' de ' + this.contadorEjer);
    //LLENADO DE TABLA RESULTS INICIO
    this.round++;
    console.log('STUDENT SESSION ID', this.studentSessionId);
    //StudentSessionId
    this.resultsTable.studentSessionId = this.studentSessionId;

    //Grade
    let partialGrade = (this.calificacion / this.contadorEjer) * 100;
    this.resultsTable.grade = partialGrade;

    //Round
    this.resultsTable.round = this.round;

    //level
    this.resultsTable.level = this.level + 1;

    //LLENADO DE TABLA RESULTS FIN

    //LLENADO DE TABLA RESULTS DETAILS INICIO
    //Possible points
    this.resultsTable.resultDetails[0].possiblePoints = this.contadorEjer;

    //Points
    this.resultsTable.resultDetails[0].points = this.calificacion;

    //Possible points description
    this.resultsTable.resultDetails[0].possiblePointsDescription =
      'Cantidad de ejecicios resueltos';

    //Points description
    this.resultsTable.resultDetails[0].pointsDescription =
      'Cantidad de aciertos';

    //Metodo para crear resultado
    this.addResult(this.resultsTable);
    //LLENADO DE TABLA RESULTS DETAILS FIN

    this.descanso();
  }

  reloadPage() {
    window.location.reload();
  }
}

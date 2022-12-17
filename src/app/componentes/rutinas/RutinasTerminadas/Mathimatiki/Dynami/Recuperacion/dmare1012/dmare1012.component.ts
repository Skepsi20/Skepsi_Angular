import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { EMACO } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/emaco.model';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { Emaco1012Service } from 'src/app/services/rutinas/LogicoMatematico/emaco1012.service';
import { dmare } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/dmare.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dmare1012',
  templateUrl: './dmare1012.component.html',
  styleUrls: ['./dmare1012.component.css'],
  providers: [Emaco1012Service],
})
export class DMARE1012Component implements OnInit {
  public nombreRutina = '1012DMARE';
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

  public vistaOperacion = new EMACO('', '', '', '');
  public inicioCrono: Date = new Date();

  public tiempoSegundosCrono = 35;
  public segundosDescanso = 10;
  public tiempoSegundosGeneral = 45*60;
  public tiempoSegundosInstrucciones = 15;

  public tTimerGeneral = 0;
  public tTimer = 0;
  public tTimerDescanso = 0;
  public tTimerInstrucciones = 0;

  public timerActivo: boolean = true;

  public instrucciones: boolean = true;

  public resultadoEjer: Array<any> = [];

  public ejercActivo = 1;

  public vistaAngulosFig: Array<any> = [];
  public listaContenedores: Array<any> = [];
  public listFigIrregController: any;
  public listFigIrregRand: any;
  public listEspsFig: Array<any> = [];
  public vistaEspacios: Array<any> = [];

  public fraccionesRand: Array<any> = [];
  public duplaCarasDado: Array<number> = [];

  public numeroTiradas = 6;

  public tabTiradas: dmare[] = [];
  public arrTiradas: Array<any> = [];
  public arrUsuario: Array<any> = [];
  public arrResults: Array<any> = [];
  public tiradasRestantes = 0;
  public tiradaReview=false;

  constructor(
    private _emacoService: Emaco1012Service,
    private _resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Instrucciones API
    setInterval(() => this.statusUpdate(), 30000);
    this.getSession();

    this.tTimerInstrucciones = this.tiempoSegundosInstrucciones;
    this.tTimerGeneral =
      this.tiempoSegundosGeneral + this.tiempoSegundosInstrucciones;
    this.initContEjerc();
    //this.Inicializacion();
    let _conteoTiempo = timer(0, 1000).subscribe((_x: any) => {
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
    if (this.tTimer >= this.tiempoSegundosGeneral) {
      if (this.tTimerGeneral >= (this.tiempoSegundosGeneral -1)) {
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
        this.inicioCrono = new Date();
        console.log(this.inicioCrono);
        this.mostrarEjer1();
      } else if (this.ejercActivo == 2) {
        this.inicioCrono = new Date();
        console.log(this.inicioCrono);
        this.tiradasRestantes = this.numeroTiradas;
        this.mostrarEjer2();
      } else if (this.ejercActivo == 3) {
        this.inicioCrono = new Date();
        console.log(this.inicioCrono);
        this.crearTablaTiradas();
        this.mostrarEjer3();
      }
    }
  }

  crearTablaTiradas() {
    this.tabTiradas =[];
    for (let index = 0; index < this.numeroTiradas; index++) {
      this.tabTiradas.push(
        new dmare(
          this.arrTiradas[index],
          { oper: 'operador', simbolo: '' },
          this.arrUsuario[index],
          this.arrResults[index]
        )
      );
    }
  }

  crearDuplasDados() {
    let carasDado = [1, 2, 3, 4, 5, 6];
    this.duplaCarasDado = [];
    carasDado.sort(() => Math.random() - 0.45);
    this.duplaCarasDado.push(carasDado[0]);
    carasDado.sort(() => Math.random() - 0.45);
    this.duplaCarasDado.push(carasDado[1]);
  }

  evaluateOper(tirada: dmare) {
    console.log('Tirada', tirada);
    if (tirada.tiradaCorrecta == tirada.operTirada.oper) tirada.result = true;
    else tirada.result = false;
  }

  descanso() {
    console.log('Tiempo Rest General', this.tTimerGeneral);

    this.tTimerDescanso = this.segundosDescanso;
    this.tiempoDescanso = true;

    if (this.tTimerGeneral > 0) {
      let _tiempo = setTimeout(() => {
        if (this.ejercActivo > 0) this.ejercActivo++;
        if (this.ejercActivo == 4) {
          this.ejercActivo = 2;
          console.log(this.resultsTable.grade)
          if((this.resultsTable.grade)>60){this.numeroTiradas += 3;console.log('mas del 0.6');
          }

        }
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
    this.tTimer = this.tiempoSegundosGeneral;
  }

  mostrarEjer1() {
    this.operador = { oper: '', simbolo: '' };

    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.timerActivo) {
      this.crearDuplasDados();
      console.log('VistaFracciones', this.duplaCarasDado);
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer2() {
    this.operador = { oper: '', simbolo: '' };

    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.tiradasRestantes > 0) {
      this.crearDuplasDados();
      console.log('VistaFracciones', this.duplaCarasDado);
    } else {
      this.tTimer=3;
      console.log('ArrTiradas', this.arrTiradas);
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer3() {
    this.operador = { oper: '', simbolo: '' };
    if (this.timerActivo) {
      this.crearDuplasDados();
      console.log('VistaFracciones', this.duplaCarasDado);
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  funcion1(operador: any) {
    var fraccionIzq = this.duplaCarasDado[0];
    var fraccionDer = this.duplaCarasDado[1];

    switch (operador) {
      case 'mayorq':
        if (fraccionIzq > fraccionDer) this.calificacion++;
        break;
      case 'menorq':
        if (fraccionIzq < fraccionDer) this.calificacion++;
        break;
      case 'igual':
        if (fraccionIzq == fraccionDer) this.calificacion++;
        break;

      default:
        break;
    }

    console.log('Value Left', this.duplaCarasDado[0]);
    console.log('Value Right', this.duplaCarasDado[1]);
    console.log('calif', this.calificacion);

    this.contadorEjer++;
    this.timerActivo = false;

    this.mostrarEjer1();
  }

  funcion2(operador: any) {
    var fraccionIzq = this.duplaCarasDado[0];
    var fraccionDer = this.duplaCarasDado[1];
    let tiradaCorrecta = false;

    switch (operador) {
      case 'mayorq':
        if (fraccionIzq > fraccionDer) tiradaCorrecta = true;
        break;
      case 'menorq':
        if (fraccionIzq < fraccionDer) tiradaCorrecta = true;
        break;
      case 'igual':
        if (fraccionIzq == fraccionDer) tiradaCorrecta = true;
        break;

      default:
        break;
    }

    console.log('Value Left', this.duplaCarasDado[0]);
    console.log('Value Right', this.duplaCarasDado[1]);
    console.log('calif', this.calificacion);
    console.log('TiradasRest', this.tiradasRestantes);

    if (tiradaCorrecta) {
      this.calificacion++;
      this.contadorEjer++;

      this.arrTiradas[this.numeroTiradas - this.tiradasRestantes] = operador;
      this.tiradasRestantes--;
      this.mostrarEjer2();
    } else {
      this.operador = { oper: '', simbolo: '' };
    }
  }

  funcion3() {
    this.tabTiradas.forEach((tirada) => {
      this.evaluateOper(tirada)
      if (tirada.result) this.calificacion++;
      this.contadorEjer++;
    });
    this.tiradaReview=true;
    this.tTimer=3;
    let _tiempo = setTimeout(() => {
      //this.tiradaReview=true;
      this.revisar();
      this.calificacion = 0;
    this.resultados = true;
    this.rutina = true;
    this.tiradaReview=false;
    }, this.segundosDescanso * 1000);

    //this.revisar();


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
  regresar(){
    this.router.navigateByUrl(`/usuario`)
    .then(() => {
      window.location.reload();
    });
  }
}

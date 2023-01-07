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

  public operacionesController: any;
  public areaPerController: any;
  public operacionesRandom: any;
  public areaPerRandom: any;
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
  public duplaOperaciones: Array<dmaco> = [];
  public duplaAreaPer: Array<dmaco> = [];
  public resultadoDupla: any;
  public inicioCrono: Date = new Date();

  //5 minutos (300)
  public tiempoSegundosCrono = 300;
  // 1 minuto (60)
  public segundosDescanso: any = 60;
  //----na----
  public tiempoSegundosGeneral = 1200000;
  //15 segundos (15)
  public tiempoSegundosInstrucciones = 15;

  public tTimerGeneral = 0;
  public tTimer = 0;
  public tTimerDescanso = 0;
  public tTimerInstrucciones = 0;


  public timerActivo:boolean=true;


  public instrucciones: boolean = true;
  public banderaEjer1: boolean = true;
  public banderaEjer2: boolean = false;

  public banderaEjer3: boolean = false;
  public bandEjer4: boolean = false;

  public strTituloAreaPer: any;
  public bandAreaPer: boolean = false;
  public resultadoEjer: Array<any> = [];

  public billMoneController: Array<dmaco> = [];
  public billMoneRandom: Array<dmaco> = [];
  public vistaBillMone: any;
  public formDesglose: any = {
    centenas: new FormControl(0),
    decenas: new FormControl(0),
    unidades: new FormControl(0),
  };
  public formCantidadBillMon: any = {
    bill100: new FormControl(0),
    bill50: new FormControl(0),
    mone10: new FormControl(0),
    mone05: new FormControl(0),
    mone01: new FormControl(0),
  };


  public formCantDinero = new FormControl(0);

  constructor(
    private _dmacoService: Dmaco1012Service,
    public datepipe: DatePipe,
    private _resultsService: ResultsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Instrucciones API
    setInterval(() => this.statusUpdate(), 30000);
    this.getSession();

    this.tTimerGeneral = this.tiempoSegundosGeneral;
    this.tTimerInstrucciones = this.tiempoSegundosInstrucciones;

    //this.Inicializacion();
    let conteoTiempo = timer(0, 1000).subscribe(x =>{
      this.sonarAlarmas();
      this.tTimer--;
      this.tTimerInstrucciones--;
      if (this.tTimerInstrucciones == 0) {
        this.instrucciones = false;
        this.Inicializacion();
      }
      if (this.tTimer<=0)this.timerActivo=false;
      else this.timerActivo=true;
      if(this.tTimerDescanso>0) this.tTimerDescanso--;
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
    if (this.rutina){
    if (this.tTimer >= this.tiempoSegundosCrono) {
      if (this.tTimerGeneral >= this.tiempoSegundosGeneral - 1) {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initRutAudio')
        );
        alarmInitRutina.volume = 0.2;
        alarmInitRutina.play();
      } else {
        let alarmInitEjer = <HTMLAudioElement>(
          document.getElementById('initEjerAudio')
        );
        alarmInitEjer.volume = 0.2;
        alarmInitEjer.play();
      }
    }
    if (this.tTimer == 3) {
      let alarmFinEjer = <HTMLAudioElement>(
        document.getElementById('finEjerAudio')
      );
      alarmFinEjer.volume = 0.2;
      alarmFinEjer.play();
    }}
  }


  Inicializacion() {
    this.resultados = false;
    this.tiempoDescanso = false;
    this.contadorEjer = 0;
    if (!this.instrucciones) {
    this.resetTimerEjer();
    if (this.banderaEjer1) {
      this.operacionesController = this._dmacoService.getOperaciones();
      this.operacionesRandom = this.operacionesController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer1();
    } else if (this.banderaEjer2) {
      this.areaPerController = this._dmacoService.getAreaPer();
      this.areaPerRandom = this.areaPerController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer2();
    } else if (this.banderaEjer3) {
      this.billMoneController = JSON.parse(
        JSON.stringify(this._dmacoService.getBillMine())
      );
      this.billMoneRandom = this.billMoneController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer3();
    }
    else if(this.bandEjer4){
      this.billMoneController = JSON.parse(
        JSON.stringify(this._dmacoService.getBillMine())
      );
      this.billMoneRandom = this.billMoneController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer4();

    }

    else this.rutina=false;
  }
  }

  crearDuplasOperaciones() {
    this.duplaOperaciones = [];
    this.operacionesRandom = this.operacionesController.sort(
      () => Math.random() - 0.5
    );
    this.duplaOperaciones.push(this.operacionesRandom[0]);
    this.duplaOperaciones.push(this.operacionesRandom[1]);
  }

  crearDuplasAreaPer() {
    this.duplaAreaPer = [];
    this.areaPerRandom = this.areaPerRandom.sort(() => Math.random() - 0.5);
    this.duplaAreaPer.push(this.areaPerRandom[1]);
    /* Se comenta, solo se requiere perimetros
    if (this.contadorEjer % 2 == 0) {
      this.strTituloAreaPer = 'las áreas';
      this.bandAreaPer = true;
    } else {
      this.bandAreaPer = false;
      this.strTituloAreaPer = 'los perímetros';
    }
    */

    for (var i = this.areaPerRandom.length - 1; i >= 0; i--) {
      if (this.areaPerRandom[i] != this.duplaAreaPer[0]) {
        this.duplaAreaPer.push(this.areaPerRandom[i]);
        break;
      }
    }

    /*console.log(
      'A Izq:' +
        this.duplaAreaPer[0].valorArea +
        'A der:' +
        this.duplaAreaPer[1].valorArea
    );
    */
    console.log(
      'P Izq:' +
        this.duplaAreaPer[0].valorPer +
        'P der:' +
        this.duplaAreaPer[1].valorPer
    );
  }

  descanso() {
    this.tTimerDescanso=this.segundosDescanso;
    var inicioCronoDescanso=new Date();
    this.tiempoDescanso = true;
    if (this.banderaEjer3) {
      this.banderaEjer3 = false;
      this.bandEjer4 = true;
      this.Inicializacion();
    }
    else if(this.bandEjer4){
      this.bandEjer4=false;
      this.Inicializacion();
    }
    else {
      var tiempo = setTimeout(() => {
        if (this.banderaEjer1) {
          this.banderaEjer1 = false;
          this.banderaEjer2 = true;
        } else if (this.banderaEjer2) {
          this.banderaEjer2 = false;
          this.banderaEjer3 = true;
        }
        this.tiempoDescanso = false;
        this.Inicializacion();
      }, this.segundosDescanso * 1000);
    }
  }

  esperar() {
    var tiempo = setTimeout(() => {
      this.tiempoDescanso = false;
      this.Inicializacion();
    }, this.segundosDescanso * 1000);
  }

  resetTimerEjer(){
    this.timerActivo=true;
    this.tTimer=this.tiempoSegundosCrono+1;
  }


  mostrarEjer1() {
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    //console.log('RestaTime:' + RestaTiempo);
    if (RestaTiempo < this.tiempoSegundosCrono) {
      this.crearDuplasOperaciones();
    } else {
      this.revisar();
      this.resultadoEjer[0] = {
        aciertos: this.calificacion,
        intentos: this.contadorEjer,
      };
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer2() {
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    //console.log('RestaTime:' + RestaTiempo);
    if (RestaTiempo < this.tiempoSegundosCrono) {
      this.crearDuplasAreaPer();
    } else {
      this.revisar();
      this.resultadoEjer[1] = {
        aciertos: this.calificacion,
        intentos: this.contadorEjer,
      };
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer3() {
    //reset de FormControl en cada imagen
    this.formDesglose.centenas = new FormControl(0);
    this.formDesglose.decenas = new FormControl(0);
    this.formDesglose.unidades = new FormControl(0);
    this.formCantidadBillMon.bill100 = new FormControl(0);
    this.formCantidadBillMon.bill50 = new FormControl(0);
    this.formCantidadBillMon.mone10 = new FormControl(0);
    this.formCantidadBillMon.mone05 = new FormControl(0);
    this.formCantidadBillMon.mone01 = new FormControl(0);

    //Compara tiempo con respecto a contador
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    //console.log('RestaTime:' + RestaTiempo);
    if (RestaTiempo < this.tiempoSegundosCrono) {
      this.vistaBillMone = this.billMoneRandom.pop();
      console.log('Vista', this.vistaBillMone);
    } else {
      this.revisar();
      this.resultadoEjer[2] = {
        aciertos: this.calificacion,
        intentos: this.contadorEjer,
      };
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer4(){
    this.formCantDinero=new FormControl(0);
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    //console.log('RestaTime:' + RestaTiempo);
    if (RestaTiempo < this.tiempoSegundosCrono) {
      this.vistaBillMone = this.billMoneRandom.pop();
      console.log('Vista', this.vistaBillMone);
    } else {
      this.revisar();
      this.resultadoEjer[3] = {
        aciertos: this.calificacion,
        intentos: this.contadorEjer,
      };
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  funcionUno(valor: any) {
    //console.log("Seleccion:"+valor);

    //console.log('Dupla 0 ' +this.duplaOperaciones[0].resultado);
    //console.log('Dupla 1 ' +this.duplaOperaciones[1].resultado);

    if (
      this.duplaOperaciones[0].resultado == this.duplaOperaciones[1].resultado
    )
      this.resultadoDupla = 'igual';
    if (this.duplaOperaciones[0].resultado > this.duplaOperaciones[1].resultado)
      this.resultadoDupla = 'mayorq';
    if (this.duplaOperaciones[0].resultado < this.duplaOperaciones[1].resultado)
      this.resultadoDupla = 'menorq';
    //console.log('ResultadoDupla:'+this.resultadoDupla);

    if (valor == this.resultadoDupla) this.calificacion++;

    this.contadorEjer++;
    this.mostrarEjer1();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcionDos(valor: any) {
    //console.log("Seleccion:"+valor);

    //console.log('Dupla 0 ' +this.duplaOperaciones[0].resultado);
    //console.log('Dupla 1 ' +this.duplaOperaciones[1].resultado);

    var valorArea: any;
    var valorPer: any;

    if (
      parseInt(this.duplaAreaPer[0].valorArea) ==
      parseInt(this.duplaAreaPer[1].valorArea)
    )
      valorArea = 'igual';
    if (
      parseInt(this.duplaAreaPer[0].valorArea) >
      parseInt(this.duplaAreaPer[1].valorArea)
    )
      valorArea = 'mayorq';
    if (
      parseInt(this.duplaAreaPer[0].valorArea) <
      parseInt(this.duplaAreaPer[1].valorArea)
    )
      valorArea = 'menorq';

    if (
      parseInt(this.duplaAreaPer[0].valorPer) ==
      parseInt(this.duplaAreaPer[1].valorPer)
    )
      valorPer = 'igual';
    if (
      parseInt(this.duplaAreaPer[0].valorPer) >
      parseInt(this.duplaAreaPer[1].valorPer)
    )
      valorPer = 'mayorq';
    if (
      parseInt(this.duplaAreaPer[0].valorPer) <
      parseInt(this.duplaAreaPer[1].valorPer)
    )
      valorPer = 'menorq';
    //Se ajusta solo perimetros
    //if (this.bandAreaPer) this.resultadoDupla = valorArea;
    //else this.resultadoDupla = valorPer;
    this.resultadoDupla = valorPer;

    //console.log('ResultadoDupla:'+this.resultadoDupla);
    if (valor == this.resultadoDupla) this.calificacion++;

    this.contadorEjer++;
    this.mostrarEjer2();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcionTres() {
    let vistaDesglose = {
      centenas: Math.floor(this.vistaBillMone.valorDinero / 100),
      decenas: Math.floor((this.vistaBillMone.valorDinero % 100) / 10),
      unidades: this.vistaBillMone.valorDinero % 10,
    };
    console.log('FormDesglose', this.formDesglose);

    console.log('VistaDesglose', vistaDesglose);

    if (
      vistaDesglose.centenas == this.formDesglose.centenas.value &&
      vistaDesglose.decenas == this.formDesglose.decenas.value &&
      vistaDesglose.unidades == this.formDesglose.unidades.value
    ) {
      this.calificacion++;
      console.log('Desgloce CDU correcto');
    }

    if (
      this.vistaBillMone.imgDesglose[0] ==
        this.formCantidadBillMon.bill100.value &&
      this.vistaBillMone.imgDesglose[1] ==
        this.formCantidadBillMon.bill50.value &&
      this.vistaBillMone.imgDesglose[2] ==
        this.formCantidadBillMon.mone10.value &&
      this.vistaBillMone.imgDesglose[3] ==
        this.formCantidadBillMon.mone05.value &&
      this.vistaBillMone.imgDesglose[4] == this.formCantidadBillMon.mone01.value
    ) {
      this.calificacion++;

      console.log('Cantidad Monedas y billetes correcto');
    }

    this.contadorEjer += 2;

    this.mostrarEjer3();
  }

  funcionCuatro() {
    console.log('InputFormDinero', this.formCantDinero.value);

    if (this.formCantDinero.value==this.vistaBillMone.valorDinero) {this.calificacion++;
    console.log('dinero correcto');
    }
    this.contadorEjer++;
    this.mostrarEjer4();
  }

  revisar() {
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

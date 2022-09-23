import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { timer } from 'rxjs';
import { AMACO } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/amaco.model';
import { Amaco1012Service } from 'src/app/services/rutinas/LogicoMatematico/amaco1012.service';

@Component({
  selector: 'amaco1012',
  templateUrl: './amaco1012.component.html',
  styleUrls: ['./amaco1012.component.css'],
  providers: [Amaco1012Service],
})
export class Amaco1012Component implements OnInit {

  public nombreRutina = '1012AMACO';
  public intentosTotales = 0;
  public aciertosTotales = 0;

  public operacionesController: any;
  public operacionesRandom: any;

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

  public vistaOperacion = new AMACO('', '', '', '', '', '', '');
  public inicioCrono: Date = new Date();

  public tiempoSegundosCrono = 25;
  //25
  public segundosDescanso = 15;
  //15
  public tiempoSegundosGeneral = 150;
  //150
  public tTimerGeneral = 0;
  public tTimer = 0;
  public tTimerDescanso = 0;
  public timerActivo: boolean = true;

  public resultadoEjer: Array<any> = [];

  public banderaEjer1: boolean = true;
  public banderaEjer2: boolean = false;
  public banderaEjer3: boolean = false;
  public bandEjer4: boolean = false;

  public ejercActivo = 3;

  public vistaFigGeo: Array<any> = [];
  public listaContenedores: Array<any> = [];
  public listFigGeoController: any;
  public listFigGeoRand: any;
  public listEspsFig: Array<any> = [];
  public vistaEspacios: Array<any> = [];

  //Ejercicio3
  public fraccionesRand: Array<any> = [];
  public duplaFracciones: Array<AMACO> = [];

  constructor(private _amacoService: Amaco1012Service) {}

  ngOnInit(): void {
    this.tTimerGeneral = this.tiempoSegundosGeneral;
    this.initContEjerc();
    this.Inicializacion();
    let _conteoTiempo = timer(0, 1000).subscribe((_x) => {
      this.sonarAlarmas();
      this.tTimer--;
      this.tTimerGeneral--;
      if (this.tTimer == 0) {
        this.timerActivo = false;
        switch (this.ejercActivo) {
          case 1:
            this.funcion1('');
            break;
          case 2:
            this.funcion2();
            break;

          case 3:
            this.funcion3(this.operador.oper);
            break;

          default:
            break;
        }
      } else if (this.tTimer > 0) this.timerActivo = true;
      if (this.tTimerDescanso > 0) this.tTimerDescanso--;
    });
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
      if (event.container.data.length == 0) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      else{
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          0,
          event.currentIndex
        );

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex+1,
          0
        );
      }
    }

    /*
    for (let  i=0 ; i<2 ; i++){
      event.container.data.splice( 1 ,1)
    }
   */
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
    if (this.ejercActivo > 0 && this.ejercActivo < 4) this.resetTimerEjer();
    if (this.ejercActivo == 1) {
      this.operacionesController = this._amacoService.getOperaciones();
      this.operacionesRandom = this.operacionesController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer1();
    } else if (this.ejercActivo == 2) {
      this.listFigGeoController = JSON.parse(
        JSON.stringify(this._amacoService.getFigGeo())
      );
      this.listFigGeoRand = this.listFigGeoController.sort(
        () => Math.random() - 0.5
      );
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer2();
    } else if (this.ejercActivo == 3) {
      this.fraccionesRand = this._amacoService.getFracciones();
      this.fraccionesRand.sort(() => Math.random() - 0.5);
      this.inicioCrono = new Date();
      console.log(this.inicioCrono);
      this.mostrarEjer3();
    }
  }

  crearVistaOperaciones() {
    var posiblesValores = [];
    this.operacionesRandom = this.operacionesController.sort(
      () => Math.random() - 0.5
    );
    this.vistaOperacion = this.operacionesRandom[0];

    posiblesValores[0] = (
      parseInt(this.vistaOperacion.resultado) + Math.floor(Math.random() * 3)
    ).toString();
    posiblesValores[1] = this.vistaOperacion.resultado;
    posiblesValores[2] = Math.abs(
      parseInt(this.vistaOperacion.resultado) - Math.floor(Math.random() * 3)
    ).toString();
    this.vistaOperacion.resultVista =
      posiblesValores[Math.floor(Math.random() * 3)];
  }

  initListasFigGeo() {
    this.listFigGeoRand = this.listFigGeoController.sort(
      () => Math.random() - 0.5
    );
    for (let i = 0; i < 5; i++) {
      this.listaContenedores[i] = [];
    }
  }

  crearListasFigGeo() {
    this.listEspsFig = [];
    this.vistaFigGeo = this.listFigGeoRand.slice(0, 5);
    console.log('VFG', this.vistaFigGeo);
    this.vistaFigGeo.forEach((element) => {
      this.listEspsFig.push(element.espacioCorr);
    });
    this.listEspsFig.sort(() => Math.random() - 0.45);
  }

  crearDuplasFracciones() {
    this.fraccionesRand.sort(() => Math.random() - 0.45);
    this.duplaFracciones = this.fraccionesRand.slice(0, 2);
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
      this.crearListasFigGeo();
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  mostrarEjer3() {
    //Compara tiempo con respecto a contador
    let RestaTiempo = Math.floor(
      (new Date().getTime() - this.inicioCrono.getTime()) / 1000
    );
    if (this.timerActivo) {
      this.crearDuplasFracciones();
      console.log('VistaFracciones', this.duplaFracciones);
    } else {
      this.revisar();
      this.calificacion = 0;
      this.resultados = true;
      this.rutina = true;
    }
  }

  funcion1(valor: any) {
    if (
      this.vistaOperacion.resultVista == this.vistaOperacion.resultado &&
      valor
    )
      this.calificacion++;
    if (
      this.vistaOperacion.resultVista != this.vistaOperacion.resultado &&
      !valor
    )
      this.calificacion++;

    this.contadorEjer++;
    this.mostrarEjer1();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcion2() {
    var listaFigurasResult: Array<any> = [];

    for (let index = 0; index < this.listaContenedores.length; index++) {
      this.listaContenedores[index].forEach((element: any) => {
        if (element.espacioCorr == this.listEspsFig[index].toString())
          this.calificacion++;
      });
    }

    console.log('Contendores:', listaFigurasResult);

    this.contadorEjer += 5;
    this.mostrarEjer2();
    console.log('Calificacion Acumulada -> ' + this.calificacion);
  }

  funcion3(operador: any) {
    var fraccionIzq = eval(this.duplaFracciones[0].fraccion);
    var fraccionDer = eval(this.duplaFracciones[1].fraccion);

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

    console.log('Value Left', eval(this.duplaFracciones[0].fraccion));
    console.log('Value Right', eval(this.duplaFracciones[1].fraccion));

    this.contadorEjer++;

    this.mostrarEjer3();
  }

  revisar() {
    this.resultadoEjer[this.ejercActivo - 1].aciertos += this.calificacion;
    this.resultadoEjer[this.ejercActivo - 1].intentos += this.contadorEjer;
    this.calificacionVista = this.calificacion;
    console.log('RESULTADO: ' + this.calificacion + ' de ' + this.contadorEjer);
    this.descanso();
  }

  reloadPage() {
    window.location.reload();
  }
}

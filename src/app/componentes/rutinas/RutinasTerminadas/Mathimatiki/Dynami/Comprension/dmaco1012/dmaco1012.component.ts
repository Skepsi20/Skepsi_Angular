import { Component, OnInit } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { dmaco } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/dmaco.mode';
import { Dmaco1012Service } from 'src/app/services/rutinas/LogicoMatematico/dmaco1012.service';

@Component({
  selector: 'dmaco1012',
  templateUrl: './dmaco1012.component.html',
  styleUrls: ['./dmaco1012.component.css'],
  providers: [Dmaco1012Service],
})
export class Dmaco1012Component implements OnInit {

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

  public tiempoSegundosCrono = 20;
  public segundosDescanso: any = 15;
  public tTimer = 0;
  public tTimerDescanso = 0;
  public timerActivo:boolean=true;
  public tiempoSegundosGeneral = 120;
  public tTimerGeneral = 0;



  public banderaEjer1: boolean = true;
  public banderaEjer2: boolean = false;
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

  public banderaEjer3: boolean = false;
  public bandEjer4: boolean = false;
  public formCantDinero = new FormControl(0);

  constructor(
    private _dmacoService: Dmaco1012Service,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.Inicializacion();
    this.tTimerGeneral = this.tiempoSegundosGeneral;
    let conteoTiempo = timer(0, 1000).subscribe(x =>{
      this.sonarAlarmas();
      this.tTimer--;
      if (this.tTimer<=0)this.timerActivo=false;
      else this.timerActivo=true;
      if(this.tTimerDescanso>0) this.tTimerDescanso--;
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


  Inicializacion() {
    this.resultados = false;
    this.tiempoDescanso = false;
    this.contadorEjer = 0;
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
  }

  reloadPage() {
    window.location.reload();
  }
}

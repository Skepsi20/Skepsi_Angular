import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { dgnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/dgnre.model';
import { DGNRE1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Recuperacion/dgnre1012.service';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paquetes-skepsi',
  templateUrl: './paquetes-skepsi.component.html',
  styleUrls: ['./paquetes-skepsi.component.css']
})
export class PaquetesSkepsiComponent implements OnInit {
    public cookieUser : string = '';
  public userJson : any = '';
  public banderas:Array<dgnre> =[];
  public rutinaUnoIniciada = false;
  public rutinaNombresIniciada = false;
  public rutinaCaracteristicasIniciada = false;
  public rutinaPreguntasUnoIniciada = false;
  public rutinaPreguntasDosIniciada = false;
  public banderasMostradas = false;
  public nombresMostrados = false;
  public perrosMostrar:any;
  public espacioMostrar:any;
  public pistasMostrar:any;
  public preguntasMostrar:any;

  public preguntasNombres = ['¿Quién se llama Alan?','¿Quién se llama Vico?','¿Quién se llama Mau?'];
  public preguntasCaracteristicas = ['¿Quién lleva puesta una gorra?','¿Quién usa zapatos rojos?','¿Quién utiliza una laptop?'];
  public preguntasUno = ['¿A qué compañía aérea corresponde?','¿Dónde se van a realizar escalas?','¿Cuál es la sala en la que deben presentarse?'];
  public preguntasUnoRespuestas = [
    ['Aivanca','Avaican','Avianca'],
    ['San Salvador, Bogotá, Lima y Brasilia','San Salvador, Bogotá, Perú y Brasilia','San Salvador, Bogotá, Lima y Argentina'],
    ['3 C 1','3 A 1','3 B 1']
  ]
  public preguntasDos = ['¿A cuántas cucharadas de agua se le añade el azafrán?','¿Qué ingredientes lleva la receta?','¿En dónde se añaden las yemas?'];
  public preguntasDosRespuestas = [
    ['3','2','1'],
    ['Mantequilla, Guisantes, Queso manchego, Arroz, Yemas','Mantequilla, Guisantes, Queso parmesano, Arroz, Yemas','Mantequilla, Chicharos, Queso parmesano, Arroz, Yemas'],
    ['En una bandeja amplia','En un sartén','En la cazuela']
  ]

  /* VARIABLES DE RUTINA INICIO */
  public todasLasBanderas: Array<any> = [];
  public banderasRandomDos:any = [];
  public valor = 0;
  public banderaVista:any;
  public porc = 25;
  public aux = 0;
  public auxDos = 0;
  public auxTres = 0;
  public auxCuatro = 0;
  public auxCinco = 0;
  public promedio = 0;
  public promedioPerros = 0;
  public indicePerros = 0;
  public calificacionPerros = 0;

  public respuestas:any = [];
  public respuestasNombres:any = [];
  public respuestasCaracteristicas:any = [];
  public respuestasPreguntasUno:any = [];
  public respuestasPreguntasDos:any = [];
  public respuestasPerros: any = [];

  public banderasSi:any = [];
  public aciertos = 0;
  public rutinaBanderas = true;
  public rutinaNombres = false;
  public rutinaCaracteristicas = false;
  public rutinaPreguntasUno = false;
  public rutinaPreguntasDos = false;
  public mostrarResultados = false;
  public mostrarCalificacionesPerros = false;
  public nombreVista = '';
  public caracteristicaVista = '';
  public preguntaUnoVista = '';
  public preguntaDosVista = '';
  public opcionesDeRespuestaUnoVista: any;
  public opcionesDeRespuestaDosVista: any;

/* VARIABLES DE RUTINA FIN */

/* VARIABLES DE RUTINA DOS INCIO */
@ViewChild('dropListContainer') dropListContainer?: ElementRef;
dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  public rutinaPerrosUno = false;
  public preguntas = [
    [
      {descripcion:'¿Cuál es el correcto orden del más joven al más viejo?'},
    ],
    [
      {descripcion:'Es la hora de comer y los perritos se acomodan conforme van llegando'}
    ],
    [
      {descripcion:'Al final del día, los perritos reciben galletas por su comportamiento, el que mejor se porta recibe 4 y el peor portado solo 1, ¿Quién se portó mejor?'}
    ],
    [
      {descripcion:'Los perritos serán recogidos en la camioneta para llevarlos a la guardería, ¿Por quién pasaron 1ro y quién fue el último?'}
    ],
    [
      {descripcion:'Todos los perritos de la guardería participan en una carrera, ¿Quién llegó 1ro y quién llegó último?'}
    ]
  ]
  public pistas = [
    [
      {pista:'Firulais no es el más joven'},
      {pista:'Milaneso es el más viejo'},
      {pista:'Solovino no es el más viejo'}
    ],[
      {pista:'Lola y Daisy no llegan al mismo tiempo'},
      {pista:'Milaneso llegó después de Daisy'}
    ],[
      {pista:'Taquito tuvo 2 galletas menos de Daisy'},
      {pista:'Daisy tuvo 3 galletas más que Solovino'},
      {pista:'Lola recibió 1 galleta más que Taquito'}
    ],[
      {pista:'Milaneso no fue el primero pero tampoco el último'},
      {pista:'Firulais fue recogido después de Taquito'},
      {pista:'Taquito fue recogido antes de Firulais y Milaneso'}
    ],[
      {pista:'Lola llegó entre Taquito y Firulais'},
      {pista:'Daisy llegó entre Solovino y Firulais'},
      {pista:'Milaneso llegó después de Solovino'}
    ]
  ]
  public indicadoresDeRespuestas = [
    [
      {nombre:'Joven'},
      {nombre: 'Mediano'},
      {nombre: 'Viejo'}
    ],[
      {nombre: '1ro'},
      {nombre: '2do'},
      {nombre: '3ro'}
    ],[
      {nombre: '4 galletas'},
      {nombre: '3 galletas'},
      {nombre: '2 galletas'},
      {nombre: '1 galletas'}
    ],[
      {nombre: '1ro'},
      {nombre: '2do'},
      {nombre: '3ro'},
      {nombre: '4to'},
    ],[
      {nombre: '1ro'},
      {nombre: '2do'},
      {nombre: '3ro'},
      {nombre: '4to'},
      {nombre: '5to'},
      {nombre: '6to'},
    ]
  ]
  public perros = [
    [
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-05.png',nombre:'Firulais'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-02.png',nombre:'Milaneso'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-04.png',nombre:'Solovino'},
    ],[
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-01.png', nombre:'Lola'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-02.png', nombre:'Milaneso'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-06.png', nombre:'Daisy'}
    ],[
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-01.png', nombre:'Lola'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-04.png', nombre:'Solovino'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-03.png', nombre:'Taquito'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-06.png', nombre:'Daisy'}
    ],[
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-05.png',nombre:'Firulais'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-04.png',nombre:'Solovino'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-03.png',nombre:'Taquito'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-02.png',nombre:'Milaneso'},
    ],[
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-05.png',nombre:'Firulais'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-02.png',nombre:'Milaneso'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-01.png', nombre:'Lola'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-04.png',nombre:'Solovino'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-03.png',nombre:'Taquito'},
      {imagen:'../../../../assets/img/skepsi/imagenes/Perritos-06.png',nombre:'Daisy'}
    ]
  ]

/* VARIABLES DE RUTINA DOS FIN */

  constructor(
    private _dgnreService: DGNRE1012Service,
    private cookieService : CookieService,
    private router: Router
  ) {}

  timeLeft: number = 10;
  timeLeftTwo: number = 10;
  timeLeftThree: number = 15;
  timeLeftFour: number = 20;
  timeLeftFive: number = 40;

  interval:any;
  startTimer() {
    this.rutinaUnoIniciada = true;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.banderasMostradas = true;
      }
    },1000)
  }

  startTimerTwo() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeftTwo > 0) {
        this.timeLeftTwo--;
      } else {
        this.rutinaNombresIniciada = true;
      }
    },1000)
  }

  startTimerThree() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeftThree > 0) {
        this.timeLeftThree--;
      } else {
        this.rutinaCaracteristicasIniciada = true;
      }
    },1000)
  }

  startTimerFour() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeftFour > 0) {
        this.timeLeftFour--;
      } else {
        this.rutinaPreguntasUnoIniciada = true;
      }
    },1000)
  }

  startTimerFive() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeftFive > 0) {
        this.timeLeftFive--;
      } else {
        this.rutinaPreguntasDosIniciada = true;
      }
    },1000)
  }

  getDecodedAccessToken(accessToken: string): any {
    try {
      return jwt_decode(accessToken);
    } catch(Error) {
      this.userJson = "Invalid user";
    }
  }


  ngOnInit(): void {
    this.cookieUser = this.cookieService.get('accessToken');
    if(this.cookieUser){
      this.userJson = this.getDecodedAccessToken(this.cookieUser);
      if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Usuario'){
        this.router.navigate(['usuario']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Administrador'){
        this.router.navigate(['administrador']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Tutor'){
        this.router.navigate(['entrenador']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Ventas'){
        this.router.navigate(['panel-ventas']);
      }
      else if(this.userJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Gimnasio'){
        this.router.navigate(['panel-gimnasio']);
      }
    }
    this.Inicializacion();
  }

  Inicializacion(){
    this.todasLasBanderas = this._dgnreService.getBanderas();
    const totalDeBanderas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    let totalDeBanderasRandom = totalDeBanderas.sort(function() {return Math.random() - 0.5});
    this.preguntasNombres = this.preguntasNombres.sort(function () {return Math.random() - 0.5});
    this.preguntasCaracteristicas = this.preguntasCaracteristicas.sort(function () {return Math.random() - 0.5});
    console.log("RANDOM",this.preguntasDos)
    let banderasRandom = [];
    let diezIndicesRandom = [];

    for (let index = 0; index < 10; index++) {
      diezIndicesRandom[index] = totalDeBanderas[index];
      banderasRandom[index] = this.todasLasBanderas[totalDeBanderasRandom[index]];
      if(index < 5){
        banderasRandom[index].estado = 'si';
        this.banderasSi.push(banderasRandom[index]);
      }else{
        banderasRandom[index].estado = 'no';
      }
    }
    let totalDeBanderasDosRandom = diezIndicesRandom.sort(function() {return Math.random() - 0.5});
    for (let index = 0; index < 10; index++) {
      this.banderasRandomDos[index] = this.todasLasBanderas[totalDeBanderasDosRandom[index]];
    }
    this.mostrar(0);
  }


  mostrar(valor : number){
    if(valor < 10){
      this.banderaVista = this.banderasRandomDos[valor];
    }else{
      this.revisar();
    }
  }

  mostrarNombres(valor : number){
    if(valor < 3){
      this.nombreVista = this.preguntasNombres[valor];
      console.log("Pregunta mostrada", this.nombreVista)
    }else{
      this.revisarNombres(this.preguntasNombres);
    }
  }

  mostrarCaracteristicas(valor : number){
    if(valor < 3){
      this.caracteristicaVista = this.preguntasCaracteristicas[valor];
      console.log("Pregunta mostrada", this.caracteristicaVista)
    }else{
      this.revisarCaracteristicas(this.preguntasCaracteristicas);
    }
  }

  mostrarPreguntasUno(valor : number){
    if(valor < 3){
      this.preguntaUnoVista = this.preguntasUno[valor];
      this.opcionesDeRespuestaUnoVista = this.preguntasUnoRespuestas[valor];
      console.log("Pregunta mostrada", this.preguntaUnoVista)
      console.log("Opciones de respuesta", this.opcionesDeRespuestaUnoVista)
    }else{
      this.revisarPreguntasUno(this.preguntasUno);
    }
  }

  mostrarPreguntasDos(valor : number){
    if(valor < 3){
      this.preguntaDosVista = this.preguntasDos[valor];
      this.opcionesDeRespuestaDosVista = this.preguntasDosRespuestas[valor];
      console.log("Pregunta mostrada", this.preguntaDosVista)
      console.log("Opciones de respuesta", this.opcionesDeRespuestaDosVista)
    }else{
      this.revisarPreguntasDos(this.preguntasDos);
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
  }

  funcionDos(valor : any){
    console.log("Respuesta dada:", valor)
    this.auxDos++;
    this.respuestasNombres.push(valor);
    this.mostrarNombres(this.auxDos);
  }

  funcionTres(valor : any){
    console.log("Respuesta dada:", valor)
    this.auxTres++;
    this.respuestasCaracteristicas.push(valor);
    this.mostrarCaracteristicas(this.auxTres);
  }

  funcionCuatro(valor : any){
    console.log("Respuesta dada:", valor)
    this.auxCuatro++;
    this.respuestasPreguntasUno.push(valor);
    this.mostrarPreguntasUno(this.auxCuatro);
  }

  funcionCinco(valor : any){
    console.log("Respuesta dada:", valor)
    this.auxCinco++;
    this.respuestasPreguntasDos.push(valor);
    this.mostrarPreguntasDos(this.auxCinco);
  }

  revisar(){
    for (let index = 0; index < this.respuestas.length; index++) {
      if(this.respuestas[index] == this.banderasRandomDos[index].estado){
        this.aciertos++;
      }
    }
    this.rutinaBanderas = false;
    this.rutinaNombres = true;
    this.startTimerTwo()
    this.mostrarNombres(0);

    console.log("Reactivos", this.banderasRandomDos);
    console.log("Respuestas -> "+this.respuestas);
    console.log("Obtuviste "+this.aciertos+" de " +this.banderasRandomDos.length)
  }

  revisarNombres(preguntasNombres:any){
    console.log("Preguntas ",preguntasNombres)
    console.log("Respuestas de nombres",this.respuestasNombres)
    let respuestasNombresContador = 0;
    for (let index = 0; index < this.preguntasNombres.length; index++) {
      console.log(preguntasNombres[index].includes(this.respuestasNombres[index]))
      if(preguntasNombres[index].includes(this.respuestasNombres[index])){
        respuestasNombresContador++;
        console.log("Contador nombres: ", respuestasNombresContador)
      }
    }
    this.aciertos = this.aciertos + respuestasNombresContador;
    this.rutinaNombres = false;
    this.rutinaCaracteristicas = true;
    this.startTimerThree();
    this.mostrarCaracteristicas(0);
    console.log("Respuesta acumulada", this.aciertos)

  }

  revisarCaracteristicas(preguntasCaracteristicas:any){
    console.log("Preguntas ",preguntasCaracteristicas)
    console.log("Respuestas de caracteristicas",this.respuestasCaracteristicas)
    let respuestasCaracteristicasContador = 0;
    for (let index = 0; index < this.preguntasCaracteristicas.length; index++) {
      if(preguntasCaracteristicas[index] == '¿Quién lleva puesta una gorra?' && this.respuestasCaracteristicas[index] == 'Alan'){
        respuestasCaracteristicasContador++;
      }else if(preguntasCaracteristicas[index] == '¿Quién usa zapatos rojos?' && this.respuestasCaracteristicas[index] == 'Toño'){
        respuestasCaracteristicasContador++;
      }else if(preguntasCaracteristicas[index] == '¿Quién utiliza una laptop?' && this.respuestasCaracteristicas[index] == 'Alicia'){
        respuestasCaracteristicasContador++;
      }
      console.log("Contador caracteristicas: ", respuestasCaracteristicasContador)
    }
    this.aciertos = this.aciertos + respuestasCaracteristicasContador;
    this.rutinaCaracteristicas = false;
    this.rutinaPreguntasUno = true;
    this.startTimerFour();
    this.mostrarPreguntasUno(0);

    console.log("Respuesta acumulada", this.aciertos)

  }

  revisarPreguntasUno(preguntasUno:any){
    console.log("Preguntas ",preguntasUno)
    console.log("Respuestas de caracteristicas",this.respuestasPreguntasUno)
    let respuestasPreguntasUnoContador = 0;
    for (let index = 0; index < this.preguntasUno.length; index++) {
      if(preguntasUno[index] == '¿A qué compañía aérea corresponde?' && this.respuestasPreguntasUno[index] == 'Avianca'){
        respuestasPreguntasUnoContador++;
      }else if(preguntasUno[index] == '¿Dónde se van a realizar escalas?' && this.respuestasPreguntasUno[index] == 'San Salvador, Bogotá, Lima y Brasilia'){
        respuestasPreguntasUnoContador++;
      }else if(preguntasUno[index] == '¿Cuál es la sala en la que deben presentarse?' && this.respuestasPreguntasUno[index] == '3 B 1'){
        respuestasPreguntasUnoContador++;
      }
      console.log("Contador caracteristicas: ", respuestasPreguntasUnoContador)
    }
    this.aciertos = this.aciertos + respuestasPreguntasUnoContador;

    this.rutinaPreguntasUno = false;
    this.rutinaPreguntasDos = true;
    this.startTimerFive();
    this.mostrarPreguntasDos(0);

    console.log("Respuesta acumulada", this.aciertos)

  }

  revisarPreguntasDos(preguntasDos:any){
    console.log("Preguntas ",preguntasDos)
    console.log("Respuestas de caracteristicas",this.respuestasPreguntasUno)
    let respuestasPreguntasDosContador = 0;
    for (let index = 0; index < this.preguntasDos.length; index++) {
      if(preguntasDos[index] == '¿A cuántas cucharadas de agua se le añade el azafrán?' && this.respuestasPreguntasDos[index] == '2'){
        respuestasPreguntasDosContador++;
      }else if(preguntasDos[index] == '¿Qué ingredientes lleva la receta?' && this.respuestasPreguntasDos[index] == 'Mantequilla, Guisantes, Queso parmesano, Arroz, Yemas'){
        respuestasPreguntasDosContador++;
      }else if(preguntasDos[index] == '¿En dónde se añaden las yemas?' && this.respuestasPreguntasDos[index] == 'En la cazuela'){
        respuestasPreguntasDosContador++;
      }
      console.log("Contador caracteristicas: ", respuestasPreguntasDosContador)
    }
    this.aciertos = this.aciertos + respuestasPreguntasDosContador;
    this.rutinaPreguntasDos = false;
    this.mostrarResultados = true;
    this.promedio = (this.aciertos/22)*100;
    console.log("Respuesta acumulada", this.aciertos)
  }

  /* SEGUNDA RUTINA INICIO */
  startJuegoDos(){
    this.rutinaPerrosUno = true;

    this.preguntasMostrar = this.preguntas[this.indicePerros]
    this.pistasMostrar = this.pistas[this.indicePerros]
    this.perrosMostrar = this.perros[this.indicePerros]
    this.espacioMostrar = this.indicadoresDeRespuestas[this.indicePerros]
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.perrosMostrar, event.previousIndex, event.currentIndex);
  }

  revisarPerros(){
    this.perrosMostrar.forEach((perros:any) => {
      this.respuestasPerros.push(perros.nombre)
    });
    this.indicePerros++;

    console.log('INDICE',this.indicePerros)
    if(this.indicePerros < 5){
      this.startJuegoDos();
    }else{
      this.calificarPerros();
    }
  }

  calificarPerros(){

    this.rutinaPerrosUno = false;
    this.mostrarCalificacionesPerros = true;

    const respuestasCorrectas = ['Solovino','Firulais','Milaneso','Daisy','Milaneso','Lola','Daisy','Lola','Taquito','Solovino',
    'Taquito','Firulais','Milaneso','Solovino','Taquito','Lola','Firulais','Daisy','Solovino','Milaneso']
    for (let index = 0; index < this.respuestasPerros.length; index++) {
      if(this.respuestasPerros[index] == respuestasCorrectas[index]){
        this.calificacionPerros++;
      }
    }
    this.promedioPerros = (this.calificacionPerros/20)*100;

    console.log('Obtuviste ',this.calificacionPerros );
  }
}

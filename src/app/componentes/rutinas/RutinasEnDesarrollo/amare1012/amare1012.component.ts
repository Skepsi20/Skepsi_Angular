import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { amare } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/amare.model';
import { AMARE1012Service } from 'src/app/services/rutinas/amare1012.service';

import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'amare1012',
  templateUrl: './amare1012.component.html',
  styleUrls: ['./amare1012.component.css'],
  providers:[AMARE1012Service]
})
export class AMARE1012Component implements OnInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  public items : Array<amare> = [];
  public itemsDOM : Array<amare> = [];

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  public figurasController: any;
  public figurasRandom: any;
  public figurasArreglo : Array<amare> = [];
  public figuraVista : Array<amare> = [];
  public isDisabled : boolean = true;
  public aux : number = 0;
  public respuestas : Array<string> = [];
  public cantidadFiguras : number = 7;
  public calificacion : number = 0;
  public resultados : boolean = false;
  public figurasVista : number = 0;
  public calificacionVista: number = 0;
  public instrucciones : boolean = true;
  public temp: number = 0;
  public variable = 30;

  constructor(
    private _amareService: AMARE1012Service
  ) { }

  ngOnInit(): void {
    this.Inicializacion();
    this.instruccionesFunc();
  }

  instruccionesFunc(){
    var tiempos = setTimeout(()=>{
      this.instrucciones  = false;
    },600);
    /* 60000 */
  }

  Inicializacion(){
    this.resultados = false;
    this.figurasController = [];
    this.figurasRandom = [];
    this.figurasArreglo = [];
    this.items = [];
    this.figuraVista = [];
    this.temp = 0;
    this.items = [];
    this.itemsDOM = [];
    this.figurasController = this._amareService.getFiguras();
    this.figurasRandom = this.figurasController.sort( () => Math.random());
    this.CreacionArreglos(this.cantidadFiguras, this.figurasRandom);
  }

  CreacionArreglos(numero : number, figuraFuncion: any){
    for (let index = 0; index < numero; index++) {
      this.figurasArreglo[index] = figuraFuncion[index];
    }
    for(let index = 0; index < numero; index++){
      this.items[index] = figuraFuncion[index];
    }
    this.items.sort( () => Math.random());
    this.arregloRandom(this.cantidadFiguras);
    this.ArregloParaVista(this.figurasArreglo, this.figuraVista);
  }

  arregloRandom(valor: number){
    let arregloRandom : Array<number> = [];
    for (let index = 0; index < valor; index++) {
      arregloRandom[index] = index;
    }
    arregloRandom.sort(() => Math.random() - 0.5);
    for (let index = 0; index < valor; index++) {
      this.itemsDOM[index] = this.items[arregloRandom[index]];
      console.log("Arreglo de figuras "+this.itemsDOM[index].nombre);
    }
  }

  ArregloParaVista(figurasArreglo: any, figuraVista: any){
    var aux = 0;
    var tiempo = setInterval(()=>{
      if(aux<figurasArreglo.length){
        figuraVista[0] = this.itemsDOM[aux];
        aux++;
      }
      else if(aux >= figurasArreglo.length){
        this.isDisabled = false;
        clearInterval(tiempo);
        this.tiempoParaResponder();
      }
    },1000);
  }

  tiempoParaResponder(){
    this.temp = 100;
    var time = setInterval(() => {
      this.temp--;
      if(this.temp == 0){
        for (let index = 0; index < this.cantidadFiguras; index++) {
          this.respuestas[index] = this.items[index].nombre;
        }
        this.revisar();
        console.log(this.respuestas);
      }else if(this.temp < 0){
        clearInterval(time);
        this.temp = 0;
      }
      console.log(this.temp);
    },1000);
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

      moveItemInArray(this.items, dragIndex, dropIndex);
    }
    //Asignacion de orden de respuestas a arreglo de respuestas

    for (let index = 0; index < this.cantidadFiguras; index++) {
      this.respuestas[index] = this.items[index].nombre;
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

  revisar(){
    var porcentaje = 0;
    for (let index = 0; index < this.cantidadFiguras; index++) {
      if(this.respuestas[index] == this.itemsDOM[index].nombre){
        this.calificacion++;
      }
    }
    this.figurasVista = this.cantidadFiguras;
    this.calificacionVista = this.calificacion;
    console.log("RESULTADO: "+ this.calificacion+" de "+this.cantidadFiguras);
    porcentaje = this.cantidadFiguras * .6;
    if(this.calificacion >= porcentaje){
      this.cantidadFiguras = this.cantidadFiguras + 3;
      this.isDisabled = true;
      this.resultados = true;
    }else{
      this.cantidadFiguras = this.cantidadFiguras;
      this.isDisabled = true;
      this.resultados = true;
    }
    var tiempo = setTimeout(()=>{
      this.Inicializacion();
    },120000);
    this.calificacion = 0;
  }
}





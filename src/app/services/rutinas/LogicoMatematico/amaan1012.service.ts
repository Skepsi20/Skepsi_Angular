import { Injectable } from '@angular/core';
import { AMAAN } from 'src/app/Models/rutinas/LogicoMatematico/Analisis/amaan.model';

@Injectable({
  providedIn: 'root'
})
export class Amaan1012Service {

  public objetos: Array<AMAAN>;
  public nombresFigurasFormulas: Array<AMAAN>;
  public setOperacionesFig: Array<AMAAN>;


  constructor() {

    this.objetos=[
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-01.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-02.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-03.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-04.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-05.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-06.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-07.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-08.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-09.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-10.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-11.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-12.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-13.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-1.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-15.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-16.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-17.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-18.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-19.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\espaciosFig\\FigurasGeom-20.png', '','',[]),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\controlesMedia\\Anterior.png', 'MediaControls', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\controlesMedia\\Siguiente.png', 'MediaControls', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\controlesMedia\\Pausa.png', 'MediaControls', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\controlesMedia\\Play.png', 'MediaControls', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\flechas\\Arriba.png', 'Flechas', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\flechas\\Abajo.png', 'Flechas', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\flechas\\Derecha.png', 'Flechas', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\flechas\\Izquierda.png', 'Flechas', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\flechas\\CurvaDerecha.png', 'Flechas', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\simbolosOper\\Div.png', 'Operadores', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\simbolosOper\\Igual.png', 'Operadores', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\simbolosOper\\mas.png', 'Operadores', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\simbolosOper\\menos.png', 'Operadores', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\simbolosOper\\Mult.png', 'Operadores', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-01.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-02.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-03.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-04.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-05.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-06.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-07.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-08.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-09.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-10.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-11.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-12.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-13.png', 'CuerpoGeometrico', '', []),
      new AMAAN ('..\\assets\\img\\rutinas\\LogicoMatematico\\figurasGeo\\FigurasGeo-14.png', 'CuerpoGeometrico', '', []),


    ];

    this.nombresFigurasFormulas=[
      new AMAAN ('','','circulo', []),
      new AMAAN ('','','cuadrado', []),
      new AMAAN ('','','poligono', []),
      new AMAAN ('','','rectangulo', []),
      new AMAAN ('','','rombo', []),
      new AMAAN ('','','trapecio', []),
      new AMAAN ('','','triangulo', []),

    ];

    this.setOperacionesFig=[

      new AMAAN('','','',['1', '3']),
      new AMAAN('','','',['2', '2']),
      new AMAAN('','','',['3', '3']),
      new AMAAN('','','',['4', '0']),
      new AMAAN('','','',['5', '3']),
      new AMAAN('','','',['6', '1']),
      new AMAAN('','','',['7', '2']),
      new AMAAN('','','',['8', '0']),
      new AMAAN('','','',['9', '3']),
      new AMAAN('','','',['10', '2']),
      new AMAAN('','','',['11', '1']),
      new AMAAN('','','',['12', '0']),
      new AMAAN('','','',['13', '3']),
      new AMAAN('','','',['14', '2']),
      new AMAAN('','','',['15', '1']),
      new AMAAN('','','',['16', '0']),
      new AMAAN('','','',['17', '3']),
      new AMAAN('','','',['18', '2']),
      new AMAAN('','','',['19', '1']),
      new AMAAN('','','',['20', '0']),
      new AMAAN('','','',['21', '3']),
      new AMAAN('','','',['22', '2']),
      new AMAAN('','','',['23', '1']),
      new AMAAN('','','',['24', '0']),
      new AMAAN('','','',['25', '3']),
      new AMAAN('','','',['26', '2']),
      new AMAAN('','','',['27', '1']),
      new AMAAN('','','',['28', '0'])



    ]


  }
  ngonInit() {
    //on Init
  }

  getObjetos(){
    return this.objetos
  }

  getFigurasFormulas(){
    return this.nombresFigurasFormulas;
  }

  getSetOperacionesFig(){
    return this.setOperacionesFig;
  }

}

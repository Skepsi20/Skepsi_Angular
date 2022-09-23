import { Injectable } from '@angular/core';
import { dmaco } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/dmaco.mode';

@Injectable({
  providedIn: 'root'
})
export class Dmaco1012Service {

  public operaciones:Array<dmaco>;
  public areaOPeri: Array<dmaco>;
  public billetesyMonedas:Array<dmaco>;


  constructor(){
    this.operaciones=[
      new dmaco ('2+1', '3', '', '','','','', []),
      new dmaco ('2+2', '4', '','','','','',[]),
      new dmaco ('9-1', '8', '', '','','','',[]),
      new dmaco ('9-5', '4', '','','','','',[]),
      new dmaco ('3 x 3', '9', '','','','','',[]),
      new dmaco ('2 x 2', '4', '','','','','',[]),
      new dmaco ('9 / 3', '3', '','','','','',[])
    ];

    this.areaOPeri=[
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-01.png', '9','12','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-02.png', '9','14','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-03.png', '9','16','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-04.png', '9','16','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-05.png', '9','16','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-06.png', '9','20','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-07.png', '9','16','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-08.png', '9','18','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-09.png', '9','26','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-10.png', '9','26','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-11.png', '9','28','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-12.png', '9','20','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-13.png', '9','28','','',[]),
      new dmaco('', '', '../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-14.png', '9','22','','',[]),
    ];

    this.billetesyMonedas=[
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/150.png', '150', [0,3,0,0,0]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/160.png', '160',[1,1,1,0,0]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/255.png', '255',[2,1,0,1,0]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/78.png', '78',[0,1,2,1,3]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/100.png', '100',[0,1,5,0,0]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/200.png', '200',[1,2,0,0,0]),
      new dmaco ('','','','','','../assets/img/rutinas/LogicoMatematico/BilletesyMonedas/23.png', '23',[0,0,1,2,3]),
    ];

  }



  ngonInit(){
  }

  getOperaciones(){
      return this.operaciones;
  }

  getAreaPer(){
      return this.areaOPeri;
  }

  getBillMine(){
    return this.billetesyMonedas;
  }

}

import { Injectable } from '@angular/core';
import { amare } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/amare.model';

@Injectable({
  providedIn: 'root'
})
export class AMARE1012Service {

  public figuras:Array<amare>;

  constructor(){
      this.figuras = [
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-01.png','Triángulo equilátero','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-02.png','Heptágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-03.png','Cuadrado','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-04.png','Octágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-05.png','Pentágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-06.png','Eneágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-07.png','Hexágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-08.png','Decágono','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-09.png','Círculo','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-10.png','Tríangulo isósceles','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-11.png','Rombo','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-12.png','Estrella cuatro puntas','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-13.png','Trapecio','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-14.png','Romboide','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-15.png','Estrella cinco puntas','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-16.png','Óvalo','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-17.png','Rectángulo','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-18.png','Cruz','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-19.png','Flecha','false',true),
        new amare ('../assets/img/rutinas/LogicoMatematico/espaciosFig/FigurasGeom-20.png','Figura regular','false',true),
      ];
  }
  ngonInit(){
  }
  getFiguras(){
      return this.figuras;
  }
}

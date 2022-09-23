import { Injectable } from '@angular/core';
import { amare } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/amare.model';

@Injectable({
  providedIn: 'root'
})
export class AMARE1012Service {

  public figuras:Array<amare>;

  constructor(){
      this.figuras = [
          new amare ('../assets/img/figurasGeo/figura1.bmp','tetraedro','false',true),
          new amare ('../assets/img/figurasGeo/figura2.bmp','piramide cuadrada','false',true),
          new amare ('../assets/img/figurasGeo/figura3.bmp','piramide hexagonal','false',true),
          new amare ('../assets/img/figurasGeo/figura4.bmp','cubo','false',true),
          new amare ('../assets/img/figurasGeo/figura5.bmp','cuboide','false',true),
          new amare ('../assets/img/figurasGeo/figura6.bmp','prisma triangular','false',true),
          new amare ('../assets/img/figurasGeo/figura7.bmp','octahedro','false',true),
          new amare ('../assets/img/figurasGeo/figura8.bmp','prisma pentagonal','false',true),
          new amare ('../assets/img/figurasGeo/figura9.bmp','prisma hexagonal','false',true),
          new amare ('../assets/img/figurasGeo/figura10.bmp','dodecahedro','false',true),
          new amare ('../assets/img/figurasGeo/figura11.bmp','esfera','false',true),
          new amare ('../assets/img/figurasGeo/figura12.bmp','elipsoide','false',true),
          new amare ('../assets/img/figurasGeo/figura13.bmp','icosahedro','false',true),
          new amare ('../assets/img/figurasGeo/figura14.bmp','cono','false',true,),
          new amare ('../assets/img/figurasGeo/figura15.bmp','cilindro','false',true)
      ];
  }
  ngonInit(){
  }
  getFiguras(){
      return this.figuras;
  }
}

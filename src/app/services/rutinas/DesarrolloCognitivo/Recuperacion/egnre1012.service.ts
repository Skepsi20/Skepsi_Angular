import { Injectable } from '@angular/core';
import { egnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/egnre.model';

@Injectable({
  providedIn: 'root'
})
export class EGNRE1012Service {
  public banderas:Array<egnre>;

  constructor(){
      this.banderas = [
          new egnre ('../assets/img/banderas/banderasDos/banderas/ALEMANIA.png','Alemania',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ANDORRA.png','Andorra',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ARMENIA.png','Armenia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/AUSTRIA.png','Austria',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/AZERBAIYAN.png','Azerbaiyan',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/BELGICA.png','Bélgica',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/BIELORUSIA.png','Bielorusia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/BOSNIAYHERZEGOVINA.png','Bosnia y herzegovina',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/BULGARIA.png','Bulgaria',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/CROACIA.png','Croacia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/DINAMARCA.png','Dinamarca',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ESCOCIA.png','Escocia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ESLOVAQUIA.png','Eslovaquia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ESLOVENIA.png','Eslovenia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ESPAÑA.png','España',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/FINLANDIA.png','Finlandia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/FRANCIA.png','Francia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/GALES.png','Gales',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/GEORGIA.png','Georgia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/GRANBRETAÑA.png','Gran bretaña',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/GRECIA.png','Grecia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/HOLANDA.png','Holanda',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/HUNGRIA.png','Hungría',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/IRLANDA.png','Irlanda',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ISLANDIA.png','Islandia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/ITALIA.png','Italia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/LETONIA.png','Letonia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/LIECHTENSTEIN.png','Liechtenstein',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/LITUANIA.png','Lituania',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/LUXEMBURGO.png','Luxemburgo',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/MACEDONIA.png','Macedonia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/MALDOVIA.png','Maldovia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/MALTA.png','Malta',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/MONACO.png','Mónaco',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/NORUEGA.png','Noruega',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/POLONIA.png','Polonia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/PORTUGAL.png','Portugal',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/REPUBLICACHECA.png','República checa',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/RUMANIA.png','Rumania',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/RUSIA.png','Rusia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/SERVIA.png','Servia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/SUECIA.png','Suecia',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/TURQUIA.png','Turquía',''),
          new egnre ('../assets/img/banderas/banderasDos/banderas/UCRANIA.png','Ucrania',''),
      ];
  }
  ngonInit(){
  }
  getBanderas(){
      return this.banderas;
  }
}

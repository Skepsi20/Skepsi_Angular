import { Injectable } from '@angular/core';
import { dgnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/dgnre.model';

@Injectable({
  providedIn: 'root'
})
export class DGNRE1012Service {
  public banderas:Array<dgnre>;

  constructor(){
      this.banderas = [
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ALEMANIA.png','Alemania',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ANDORRA.png','Andorra',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ARMENIA.png','Armenia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/AUSTRIA.png','Austria',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/AZERBAIYAN.png','Azerbaiyan',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/BELGICA.png','Bélgica',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/BIELORUSIA.png','Bielorusia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/BOSNIAYHERZEGOVINA.png','Bosnia y herzegovina',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/BULGARIA.png','Bulgaria',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/CROACIA.png','Croacia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/DINAMARCA.png','Dinamarca',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ESCOCIA.png','Escocia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ESLOVAQUIA.png','Eslovaquia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ESLOVENIA.png','Eslovenia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ESPAÑA.png','España',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/FINLANDIA.png','Finlandia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/FRANCIA.png','Francia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/GALES.png','Gales',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/GEORGIA.png','Georgia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/GRANBRETAÑA.png','Gran bretaña',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/GRECIA.png','Grecia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/HOLANDA.png','Holanda',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/HUNGRIA.png','Hungría',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/IRLANDA.png','Irlanda',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ISLANDIA.png','Islandia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/ITALIA.png','Italia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/LETONIA.png','Letonia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/LIECHTENSTEIN.png','Liechtenstein',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/LITUANIA.png','Lituania',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/LUXEMBURGO.png','Luxemburgo',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/MACEDONIA.png','Macedonia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/MALDOVIA.png','Maldovia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/MALTA.png','Malta',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/MONACO.png','Mónaco',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/NORUEGA.png','Noruega',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/POLONIA.png','Polonia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/PORTUGAL.png','Portugal',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/REPUBLICACHECA.png','República checa',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/RUMANIA.png','Rumania',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/RUSIA.png','Rusia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/SERVIA.png','Servia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/SUECIA.png','Suecia',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/TURQUIA.png','Turquía',''),
        new dgnre ('../assets/img/banderas/banderasDos/banderas/UCRANIA.png','Ucrania',''),
      ];
  }
  ngonInit(){
  }
  getBanderas(){
      return this.banderas;
  }
}

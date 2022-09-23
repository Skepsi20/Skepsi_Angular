import { Injectable } from '@angular/core';
import { agnre } from 'src/app/Models/rutinas/DesarrolloCognitivo/Recuperacion/agnre.model';

@Injectable({
  providedIn: 'root'
})

export class AGNRE2012Service {

  public banderas:Array<agnre>;

  constructor(){
      this.banderas = [
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Armenia.png','../assets/img/banderas/banderasDos/MasBanderolas/ArmeniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Armenia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Armenia02.png','Armenia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Austria.png','../assets/img/banderas/banderasDos/MasBanderolas/ArmeniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Austria01.png','../assets/img/banderas/banderasDos/MasBanderolas/Austria02.png','Austria',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Belgica.png','../assets/img/banderas/banderasDos/MasBanderolas/BelgicaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Belgica01.png','../assets/img/banderas/banderasDos/MasBanderolas/Belgica02.png','Bélgica',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Bulgaria.png','../assets/img/banderas/banderasDos/MasBanderolas/BulgariaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Bulgaria01.png','../assets/img/banderas/banderasDos/MasBanderolas/Bulgaria02.png','Bulgaria',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Dinamarca.png','../assets/img/banderas/banderasDos/MasBanderolas/DinamarcaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Dinamarca01.png','../assets/img/banderas/banderasDos/MasBanderolas/Dinamarca02.png','Dinamarca',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Francia.png','../assets/img/banderas/banderasDos/MasBanderolas/FranciaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Francia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Francia02.png','Francia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Holanda.png','../assets/img/banderas/banderasDos/MasBanderolas/HolandaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Holanda01.png','../assets/img/banderas/banderasDos/MasBanderolas/Holanda02.png','Holanda',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Hungria.png','../assets/img/banderas/banderasDos/MasBanderolas/HungriaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Hungria01.png','../assets/img/banderas/banderasDos/MasBanderolas/Hungria02.png','Hungría',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Irlanda.png','../assets/img/banderas/banderasDos/MasBanderolas/IrlandaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Irlanda01.png','../assets/img/banderas/banderasDos/MasBanderolas/Irlanda02.png','Irlanda',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Italia.png','../assets/img/banderas/banderasDos/MasBanderolas/ItaliaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Italia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Italia02.png','Italia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Letonia.png','../assets/img/banderas/banderasDos/MasBanderolas/LetoniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Letonia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Letonia02.png','Letonia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Lituania.png','../assets/img/banderas/banderasDos/MasBanderolas/LituaniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Lituania01.png','../assets/img/banderas/banderasDos/MasBanderolas/Lituania02.png','Lituania',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Luxemburgo.png','../assets/img/banderas/banderasDos/MasBanderolas/LuxemburgoBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Luxemburgo01.png','../assets/img/banderas/banderasDos/MasBanderolas/Luxemburgo02.png','Luxemburgo',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Monaco.png','../assets/img/banderas/banderasDos/MasBanderolas/MonacoBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Monaco01.png','../assets/img/banderas/banderasDos/MasBanderolas/Monaco02.png','Mónaco',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Polonia.png','../assets/img/banderas/banderasDos/MasBanderolas/PoloniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Polonia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Polonia02.png','Polonia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Polonia.png','../assets/img/banderas/banderasDos/MasBanderolas/PoloniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Polonia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Polonia02.png','Polonia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Rumania.png','../assets/img/banderas/banderasDos/MasBanderolas/RumaniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Rumania01.png','../assets/img/banderas/banderasDos/MasBanderolas/Rumania02.png','Rumania',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Rusia.png','../assets/img/banderas/banderasDos/MasBanderolas/RusiaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Rusia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Rusia02.png','Rusia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Suecia.png','../assets/img/banderas/banderasDos/MasBanderolas/SueciaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Suecia01.png','../assets/img/banderas/banderasDos/MasBanderolas/Suecia02.png','Suecia',''),
          new agnre ('../assets/img/banderas/banderasDos/MasBanderolas/Ucrania.png','../assets/img/banderas/banderasDos/MasBanderolas/UcraniaBN.png','../assets/img/banderas/banderasDos/MasBanderolas/Ucrania01.png','../assets/img/banderas/banderasDos/MasBanderolas/Ucrania02.png','Ucrania',''),
      ];

  }
  ngonInit(){
  }
  getBanderas(){
      return this.banderas;
  }
}

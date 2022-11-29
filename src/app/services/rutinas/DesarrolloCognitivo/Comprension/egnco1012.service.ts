import { Injectable } from '@angular/core';
import { egnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/egnco.model';

@Injectable({
  providedIn: 'root'
})
export class Egnco1012Service {

  public dados:Array<egnco>;
  constructor(){
      this.dados = [
          new egnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aguila.png','Águila','5PA','4PAA','2OA',''),          
          
      ];
  }
}

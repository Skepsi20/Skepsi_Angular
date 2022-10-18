import { Injectable } from '@angular/core';
import { agnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/agnco.model';

@Injectable({
  providedIn: 'root'
})
export class Agnco1012Service {
  public aves:Array<agnco>;
  public mamiferos:Array<agnco>;

  constructor(){
      
      this.aves = [
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-01.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-04.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-07.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-10.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-13.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-16.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-19.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-22.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-25.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-28.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-31.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-34.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-37.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-40.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-43.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-46.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aves-49.png','1','2','2',''),
      ];

      this.mamiferos = [
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-25.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-27.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-29.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-31.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-33.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-36.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-39.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mamiferos-42.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img01.png','1','2','2',''),         
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img02.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img03.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img04.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img05.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img06.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img07.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img08.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img09.png','1','2','2',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/img10.png','1','2','2',''),
      ];
  }

  ngonInit(){
  }

  getAves(){
      return this.aves;
  }
  getMamiferos(){
      return this.mamiferos;
  }
}

import { Injectable } from '@angular/core';
import { agnco, dgnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/agnco.model';

@Injectable({
  providedIn: 'root'
})
export class Agnco1012Service {
  public aves:Array<agnco>;
  public mamiferos:Array<agnco>;
  public conjuntos:Array<dgnco>;
  public secuencias:Array<dgnco>;
  public consecuencias:Array<dgnco>;

  constructor(){
      
    //Picos, Ojos, Patas
      this.aves = [
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Aguila.png','Águila','5PA','4PAA','2OA',''),          
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Buho.png','Búho','5PA','4PAA','2OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Cacatua.png','Cacatúa','4PA','4PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Cisne.png','Cisne','3PA','6PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Colibri.png','Colibrí','1PA','1PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Flamenco.png','Flamenco','3PA','6PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Gallina.png','Gallina','4PA','5PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Gaviota.png','Gaviota','3PA','6PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Golondrina.png','Golondrina','2PA','5PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Guacamaya.png','Guacamaya','4PA','4PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Lechuza.png','Lechuza','5PA','3PAA','2OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/LoroGris.png','Loro Gris','4PA','4PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/PajaroCarpintero.png','Pájaro Carpintero','2PA','3PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/PavoReal.png','Pavo Real','6PA','5PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Pelicano.png','Pelícano','3PA','6PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Petirrojo.png','Petirrojo','6PA','4PAA','1OA',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/aves/Tucan.png','Tucán','4PA','4PAA','1OA',''),
      ];

    //Mandibulas, Vision, Patas
      this.mamiferos = [
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Alce.png','Alce','1MM','4PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Burro.png','Burro','1MM','4PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Caballo.png','Caballo','1MM','4PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Camello.png','Camello','1MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Canguro.png','Canguro','1MM','2PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Chimpance.png','Chimpancé','3MM','2PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Conejo.png','Conejo','1MM','2PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Elefante.png','Elefante','1MM','4PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Erizo.png','Erizo','2MM','4PM','1VM',''),         
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Gato.png','Gato','2MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Hamster.png','Hamster','3MM','1PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Jirafa.png','Jirafa','1MM','4PM','1VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Leopardo.png','Leopardo','2MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Mapache.png','Mapache','3MM','2PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Nutria.png','Nutria','2MM','2PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/OsoPolar.png','Oso Polar','2MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Panda.png','Panda','1MM','2PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/Perro.png','Perro','2MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/tigre.png','Tigre','2MM','4PM','2VM',''),
          new agnco ('../assets/img/rutinas/desarrolloCognitivo/agnco/mamiferos/VacaMarina.png','Vaca Marina','2MM','3PM','1VM',''),
      ];

      this.conjuntos = [
        new dgnco ('Conjunto uno'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-01.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-02.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-03.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-04.png','false'),

        new dgnco ('Conjunto dos'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-05.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-06.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-07.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-08.png','false'),
        
        new dgnco ('Conjunto tres'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-09.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-10.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-11.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-12.png','false'),
        
        new dgnco ('Conjunto cuatro'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-13.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-14.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-15.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-16.png','false'),

        new dgnco ('Conjunto cinco'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-17.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-18.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-19.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Imagenes-20.png','false'),
        
      ]

      this.secuencias = [
        new dgnco ('Secuencia uno','D;5; F;7; H;9; J;11','K;13','M;12','L;13','L;13'),
        new dgnco ('Secuencia dos','A;7; C;10; F;14; J;19','K;21','Ñ;25','Ñ;26','Ñ;25'),
        new dgnco ('Secuencia tres','D;5; F;8; H;11; J;14','Q;15','Q;16','Q;17','Q;17'),
        new dgnco ('Secuencia cuatro','Z;3; W;5; T;7; Q;9','Ñ;11','N;10','O;9','Ñ;11'),
        new dgnco ('Secuencia cinco','A;8; D;15; H;22; M;29','S;30','R;36','T;37','R;36'),
        new dgnco ('Secuencia seis','7;a; 14;e; 16;i; 32;o','o;64','a;36','u;34','u;34'),
      ]

      this.consecuencias = [  
        new dgnco ('Cómo estaría el agua dentro del camión inclinado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion02.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion03.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'),     
        new dgnco ('Cómo estaría el agua dentro del camión inclinado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion02.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion03.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'),    
      ]
  }

  ngonInit(){
  }

  getAves(){
      return this.aves;
  }
  getMamiferos(){
      return this.mamiferos;
  }

  getConjuntos(){
    return this.conjuntos;
  }

  getSecuencias(){
    return this.secuencias;
  }

  getConsecuencias(){
    return this.consecuencias;
  }
}

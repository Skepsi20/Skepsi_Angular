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
/* 

        nombre: string, 
        imagen: string, 
        opcionA: string, 
        opcionB: string, 
        opcionC: string, 
        respuesta: any

*/
      this.consecuencias = [  
        new dgnco ('Cómo estaría el agua dentro del camión inclinado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion02.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion03.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Camion01.png'),     
        new dgnco ('Qué se necesita para cambiar de estado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/estadoUno.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/frio.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/hielo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/calor.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/frio.png'),  
        new dgnco ('Qué se necesita para cambiar de estado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/estadoDos.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/frio.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/hielo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/calor.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/calor.png'),  
        new dgnco ('Qué se necesita para cambiar de estado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/estadoTres.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/frio.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/hielo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/calor.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/calor.png'),  
        new dgnco ('Un estudiante pone 100 ml de agua en cada uno de estos recipientes, y los expone al sol  durante todo el día. ¿Cuál de los recipientes perderá mayor cantidad de agua por acción de la evaporación?'
        ,''
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Liquido01.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Liquido02.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Liquido.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Liquido02.png'),  

        new dgnco ('Don Carlos camina para comprar un diario, ¿Cómo te das cuenta que don Carlos está avanzando?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/MovimientoA.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/movimientoOpA.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/movimientoOpB.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/movimientoOpC.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/movimientoOpA.png'),

        new dgnco ('¿Son iguales los recorridos de los dos vehículos?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/AutosOp.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/si.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/no.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/nosesabe.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/no.png'),

        new dgnco ('¿Cuál se mueve en línea recta?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/AutosOp.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/azul.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/amarillo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/ninguno.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/azul.png'),

        new dgnco ('¿Cuál carro se mueve en línea curva?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/AutosOp.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/azul.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/amarillo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/ninguno.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/amarillo.png'),

        new dgnco ('¿ Cuál es más veloz?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/AutosOp.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/azul.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/amarillo.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/ninguno.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/amarillo.png'),

        
        new dgnco ('Alguien te entrega una caja abierta con un agujero en un lado y te invita a mirar adentro, no sabes que la persona que construyó la caja colocó un espejo en una de las paredes, el resto de las paredes no reflejan nada de luz.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/0.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/1.png'),

        new dgnco ('Alguien te entrega una caja abierta con un agujero en un lado y te invita a mirar adentro, no sabes que la persona que construyó la caja colocó un espejo en una de las paredes, el resto de las paredes no reflejan nada de luz.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/1.png'),

        new dgnco ('En la caja con dos espejos ¿las imágenes de la joya parecen estar a la misma distancia de ti?  Elige la respuesta correcta.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo3Op1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo3Op2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo3Op3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/espejo3Op2.png'),

        new dgnco ('Imagínate ahora, en lugar de una caja rectangular, se nos da una caja triangular para mirar. Dos de las paredes están reflejadas y el ángulo entre las paredes es de 60°'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Triangulo1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/4.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/4.png'),

        new dgnco ('Aquí hay una forma en que el rayo de la joya puede salir de la caja triangular después de dos reflejos.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Triangulo2E.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/izquierda.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/derecha.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/op3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/derecha.png'),

        new dgnco ('Al final tenemos una caja larga cuyos extremos son triángulos equiláteros y que tiene lados rectangulares reflejados, hay un orificio de visualización en una de las tapas triangulares.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Triangulo3E.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/4.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/6.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/8.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/8.png'),

        new dgnco ('Aquí tenemos una balanza con una barra que tiene dos pesos iguales en los extremos.'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanzaE.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/cercaDerecha.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/cercaIzquierda.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/nocambio.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/cercaIzquierda.png'),

        new dgnco ('En la barra de arriba el objeto del extremo izquierdo pesa el doble del peso del objeto del lado derecho. ¿En dónde debe ir el soporte del alambre para que la varilla permanezca equilibrada?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Balanza1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionA.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionB.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionC.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionB.png'),
        
        new dgnco ('Considere este móvil que tiene un peso de 3 kg a la izquierda y un peso de 1kg a la derecha, ¿Dónde debemos colocar el peso de 2 kg para equilibrar el móvil?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Balanza2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionA.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionC.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionD.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionA.png'),

        new dgnco ('Ahora pasemos a los móviles de dos niveles, donde tenemos que equilibrar cada nivel sin desequilibrar el equilibrio del otro. Para empezar, usaremos un segundo nivel que tiene pesos iguales en cualquier lado. ¿Dónde debemos unir un cable de soporte a la primera varilla para que todo el móvil quede equilibrado?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Balanza3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionB.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionC.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionD.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/posicionD.png'),

        new dgnco ('Ahora supongamos que reemplazamos el segundo nivel con uno nuevo que tiene pesos desiguales y distribuye sus pesos más lejos a lo largo de la barra: ¿Dónde debemos colgar un cable de soporte para mantener equilibrados ambos niveles del móvil?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Balanza4.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanzaop1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanzaop2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanzaop3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanzaop2.png'),

        new dgnco ('Los arreglos anteriores tienen longitudes de barras idénticas: El arreglo 1 está balanceado. ¿Está equilibrado el arreglo 2?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanza5.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/siesta.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/noesta.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/nose.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/siesta.png'),
        
        new dgnco ('El siguiente móvil está equilibrado (en todos los niveles) cuando el peso amarillo en el tercer nivel está en su posición original (puntos abajo). Supongamos que movemos el peso amarillo hacia la izquierda, perturbando el equilibrio del tercere nivel. Afecta esto al equilibrio de algún otro nivel del móvil? De ser así, ¿cuáles?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/Balanza-conjunto.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/primerNivel.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/cuartoNivel.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/ningunNivel.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/ningunNivel.png'),
        
        new dgnco ('Aquí hay un rompecabezas móvil más para probar. Tómese su tiempo, el centro de masa es la posición promedio del peso podemos girar una barra alrededor de su centro de masa sin cambiar su ubicación ¿Cuántas de la varillas no están balanceadas?'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/balanza-conjunto1.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/2.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/3.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/equilibrado.png'
        ,'../assets/img/rutinas/desarrolloCognitivo/dgnco/equilibrado.png'),
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
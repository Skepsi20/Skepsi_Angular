import { Injectable } from '@angular/core';
import { egnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/egnco.model';

@Injectable({
  providedIn: 'root'
})
export class Egnco1012Service {
  public reactivos: Array<any>

  constructor(){
    this.reactivos = [
      ['Imagenes','Ejercicio 1 - ¿Que dado continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/dados1.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-04.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-05.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-02.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-04.png'],          
      ['Imagenes','Ejercicio 2 - ¿Que dado continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/dados2.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-02.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-03.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-01.png','../assets/img/rutinas/LogicoMatematico/Dado(caras)/dado-03.png'],          
      ['Imagenes','Ejercicio 3 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino1.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/3-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/2-3.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/3-4.png'],          
      ['Imagenes','Ejercicio 4 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino2.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/6-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/5-5.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png'],          
      ['Imagenes','Ejercicio 5 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino3.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/6-1.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/6-3.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/6-2.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/6-3.png'],          
      ['Imagenes','Ejercicio 6 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-5.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-5.png'],          
      ['Imagenes','Ejercicio 7 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino5.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-3.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/3-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/3-4.png'],          
      ['Imagenes','Ejercicio 8 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-0.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-1.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-0.png'],          
      ['Imagenes','Ejercicio 9 - ¿Que ficha continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino7.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/0-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/3-6.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/0-6.png'],          
      ['Imagenes','Ejercicio 10 (Observa las siguientes piezas de dominó e indica la siguiente ficha que corresponda a la derecha)','../assets/img/rutinas/desarrolloCognitivo/egnco/domino8.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/4-4.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/1-3.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/0-5.png','../assets/img/rutinas/desarrolloCognitivo/fichasDomino/0-5.png'],          
      ['Imagenes','Ejercicio 11 - Que imagen continua la secuencia?','../assets/img/rutinas/desarrolloCognitivo/egnco/domino10.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino10c.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino10b.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino10a.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino10c.png'],          
      ['Imagenes','Ejercicio 12 (¿Cuál figura completa la secuencia?)','../assets/img/rutinas/desarrolloCognitivo/egnco/domino11.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino11c.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino11a.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino11b.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino11a.png'],        
      ['Imagenes','Ejercicio 13 (¿Cuál figura completa la secuencia?)','../assets/img/rutinas/desarrolloCognitivo/egnco/domino12.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino12b.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino12a.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino12c.png','../assets/img/rutinas/desarrolloCognitivo/egnco/domino12a.png'],        
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-08.png'],
      ['Imagenes y texto','Ejercicio 1','Si estás al costado de un avión indica cómo se verán sus alas','../assets/img/rutinas/desarrolloCognitivo/egnco/alas2.png','../assets/img/rutinas/desarrolloCognitivo/egnco/alas3.png','../assets/img/rutinas/desarrolloCognitivo/egnco/alas1.png','../assets/img/rutinas/desarrolloCognitivo/egnco/alas2.png'],
      ['Texto','Ejercicio 2','Sabías que las alas de los aviones están curvadas en la parte superior?, el aire se mueve más rápido...','abajo','no es más rápido (igual)','arriba','arriba'],
      ['Texto','Ejercicio 3','La presión del aire en la parte superior de las alas es...','mayor','menor','igual','menor'],
      ['Texto','Ejercicio 4','Lo que hace que el avión se eleve es...','El impulso del aire lento','El impulso del aire rápido','El impulso del aire caliente','El impulso del aire lento'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-03.png'],
      ['Texto','Ejercicio 5','Cuando el aire se calienta adentro del globo, este...','Se expande','Se contrae','No tiene cambios','Se expande'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-01.png'],
      ['Texto','Ejercicio 6','Las estalactitas y las estalagmitas están hechas de...','Sales minerales','Piedra','Hielo','Sales minerales'],
      ['Texto','Ejercicio 7','Las estalagmitas son la que...','Crecen desde el techo','Crecen desde el suelo','Crecen en los lagos','Crecen desde el suelo'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-05.png'],
      ['Texto','Ejercicio 8','El planeta más cercano al Sol es...','Tierra','Venus','Mercurio','Mercurio'],
      ['Texto','Ejercicio 9','El planeta más grande de nuestro sistema solar es...','Marte','Júpiter','Mercurio','Júpiter'],
      ['Texto','Ejercicio 10','Los planetas enanos son...','Ceres, Asteroides, Urano','Ceres, Luna, Cometas','Ceres, Plutón y Eris','Ceres, Plutón y Eris'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-09.png'],
      ['Texto','Ejercicio 11','La temperatura de la Zona Polar de nuestro planeta es...','Por arriba de 0° C','Por debajo de los 0° C','36° C','Por debajo de los 0° C'],
      ['Texto','Ejercicio 12 ','El grupo aborigen que vive en el ártico se llama...','Sami o Lapones','Chukchi','Esquimales o Inuit','Esquimales o Inuit'],
      ['Texto','Ejercicio 13','El grupo aborigen que vive en Noruega, Suecia y Finlandia es...','Sami o Lapones','Esquimales o Inuit','Chukchi','Sami o Lapones'],
      ['Texto','Ejercicio 14','El grupo aborigen que vive en Siberia es...','Chukchi','Sami o Lapones','Esquimales o Inuit','Chukchi'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-04.png'],
      ['Texto','Ejercicio 16','El núcleo se divide en...','En tres núcleos','En núcleo interior y núcleo exterior','En tres regiones','En núcleo interior y núcleo exterior'],
      ['Imagen','../assets/img/rutinas/desarrolloCognitivo/egnco/Imagenes-06.png'],
      ['Texto','Ejercicio 17','La palabra Geografía es...','Amor a la Tierra','Observación de la Tierra','Descripción de la Tierra','Descripción de la Tierra'],
      ['Texto','Ejercicio 18','El estudio de la geografía comprende o abarca...','Comprende el medio físico y la relación de los seres humanos con ese medio físico','Solamente las formas del relieve','La observación de la Tierra','Comprende el medio físico y la relación de los seres humanos con ese medio físico'],
    ]
  }

  getReactivos(){
    return this.reactivos;
  }
}

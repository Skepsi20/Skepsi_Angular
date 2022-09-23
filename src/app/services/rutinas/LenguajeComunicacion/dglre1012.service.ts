import { Injectable } from '@angular/core';
import { dglre } from 'src/app/Models/rutinas/LenguajeComunicacion/dglre.model';

@Injectable({
  providedIn: 'root'
})
export class DGLRE1012Service {
  public audios:Array<dglre>;

  constructor(){
      this.audios = [
        new dglre ('../assets/Audios/dglre/Alarma.mp3','../assets/img/ImagenesSonidos/Alarma.png','alarma',''),
        new dglre ('../assets/Audios/dglre/Avion.mp3','../assets/img/ImagenesSonidos/Avion.png','Avion',''),
        new dglre ('../assets/Audios/dglre/Camara.mp3','../assets/img/ImagenesSonidos/Camara.png','Camara',''),
        new dglre ('../assets/Audios/dglre/Campanas.mp3','../assets/img/ImagenesSonidos/Campana.png','Campanas',''),
        new dglre ('../assets/Audios/dglre/Canicas.mp3','../assets/img/ImagenesSonidos/Canicas.png','Canicas',''),
        new dglre ('../assets/Audios/dglre/Celular.mp3','../assets/img/ImagenesSonidos/Celular.png','Celular',''),
        //new dglre ('../assets/Audios/dglre/Clip.mp3','../assets/img/ImagenesSonidos/Clip.png','Celular',''),
        new dglre ('../assets/Audios/dglre/FuegosArtificiales.mp3','../assets/img/ImagenesSonidos/FuegosArtificiales.png','Fuegos Artificiales',''),
        new dglre ('../assets/Audios/dglre/Gaviotas.mp3','../assets/img/ImagenesSonidos/Gaviotas.png','Gaviotas',''),
        new dglre ('../assets/Audios/dglre/Lluvia.mp3','../assets/img/ImagenesSonidos/Lluvia.png','Lluvia',''),
        new dglre ('../assets/Audios/dglre/Motocicleta.mp3','../assets/img/ImagenesSonidos/Moto.png','Motocicleta',''),
        new dglre ('../assets/Audios/dglre/Noche.mp3','../assets/img/ImagenesSonidos/Noche.png','Noche',''),
        new dglre ('../assets/Audios/dglre/PingPong.mp3','../assets/img/ImagenesSonidos/PingPong.png','PingPong',''),
        new dglre ('../assets/Audios/dglre/Recreo.mp3','../assets/img/ImagenesSonidos/Recreo.png','Recreo',''),
        new dglre ('../assets/Audios/dglre/Reloj.mp3','../assets/img/ImagenesSonidos/Reloj.png','Reloj',''),
        new dglre ('../assets/Audios/dglre/Sopa.mp3','../assets/img/ImagenesSonidos/Sopa.png','Sopa',''),
        new dglre ('../assets/Audios/dglre/Teclado.mp3','../assets/img/ImagenesSonidos/Teclado.png','Teclado',''),
        new dglre ('../assets/Audios/dglre/Timbre.mp3','../assets/img/ImagenesSonidos/Timbre.png','Timbre',''),
        new dglre ('../assets/Audios/dglre/Tren.mp3','../assets/img/ImagenesSonidos/Tren.png','Tren',''),
        new dglre ('../assets/Audios/dglre/Trueno.mp3','../assets/img/ImagenesSonidos/Trueno.png','Trueno',''),
        new dglre ('../assets/Audios/dglre/Ventilador.mp3','../assets/img/ImagenesSonidos/Ventilador.png','Ventilador',''),
        new dglre ('../assets/Audios/dglre/Vientos.mp3','../assets/img/ImagenesSonidos/Viento.png','Vientos',''),
        new dglre ('../assets/Audios/dglre/Xilofono.mp3','../assets/img/ImagenesSonidos/Xilofono.png','Xilofono',''),
      ];
  }
  ngonInit(){
  }
  getAudios(){
      return this.audios;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from 'src/app/services/Resultados/results.service';

@Component({
  selector: 'app-asyan1012',
  templateUrl: './asyan1012.component.html',
  styleUrls: ['./asyan1012.component.css']
})
export class Asyan1012Component implements OnInit {
    instruccionesDOM = true;
    emocionesDOM = false;
    bienvenidaJuegoDOM = false;
    juegoDOM = false;
    leftPosition = '1rem';
    topPosition = '1rem';
    personaje = 0;
    insultos = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t']
    vidas:any = ['../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png','../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png','../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png'];
    score:number = 0;
    endGame = false;
    tiempoDeAparicion = 2000;
    personajeDOM = true;
    dificultad: string = 'Fácil';
    respuestaPendiente = true;
    nuevaPartida = true;
    musicaDeFondo:any;
    intentos: any = 0;

    timerDescanso: number = 60;
    intervalDescanso:any;

    timeInstructions: number = 10;
    intervalInstructions:any;

    timerJugada: number = 3;
    intervalJugada:any;

    constructor(
      private router: Router,
      private _resultsService: ResultsService,

    ) { }

    ngOnInit(): void {
      setInterval(()=> this.statusUpdate(),30000);
      this.inicializacion();
      this.instrucciones();
    }

    inicializacion(){
      this.tiempoDeAparicion = 2000;
      this.personaje = 0;
      this.personajeDOM = true;
      this.dificultad = 'Fácil';
      this.timerJugada = 3;
      this.endGame = false;
      this.emocionesDOM = false;
      this.timerDescanso = 60 + (this.intentos*5);
      this.vidas = ['../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png','../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png','../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png'];
    }

    instrucciones(){
      if(this.timeInstructions > 0){
        clearInterval(this.intervalInstructions);
      }
      this.intervalInstructions = setInterval(() => {
        if(this.timeInstructions > 0) {
          this.timeInstructions--;
        } else {
            let alarmInitRutina = <HTMLAudioElement>(
              document.getElementById('initRutAudio')
            );
            alarmInitRutina.play();
            clearInterval(this.intervalInstructions);
            this.instruccionesDOM = false;
            this.emocionesDOM = true;
        }
      },1000)

    }

    statusUpdate(){
      this._resultsService.addStatus()
      .subscribe(
        (success)=>{
          console.log("Actividad actualizada")
        },(error)=>{
          console.log(error);
        }
      )
    }

    iniciarJuego(){
      this.bienvenidaJuegoDOM = false;
      this.juegoDOM = true;
      this.musicaDeFondo = new Audio();
      this.musicaDeFondo.src = "../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/fondoasyan.mp3";
      this.musicaDeFondo.load();
      this.musicaDeFondo.volume = 0.1;
      this.musicaDeFondo.play();
      this.juegoTemp();
    }

    juegoTemp(){
      this.nuevaPartida = false;
      this.intervalJugada = setInterval(() => {
        if(this.timerJugada > 0) {
          this.timerJugada--;
        } else {
          clearInterval(this.intervalJugada);
          if(this.personaje == 0){
            if(this.vidas.length == 1){
              this.endGame = true;
              this.descanso();
            }else{
              const insultoRandom = Math.floor(Math.random() * this.insultos.length);
              const insulto = this.insultos[insultoRandom];
              let audio = new Audio();
              audio.src = "../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/insultos/"+insulto+'.mp3';
              audio.load();
              audio.volume = 1;
              audio.play();
              this.vidas.pop();
            }
          }
          if(!this.endGame){
            this.randomPosition(0);
          }
        }
      },this.tiempoDeAparicion);
    }

    revisar(value: number){
      this.personajeDOM = false;
      this.tiempoDeAparicion = this.tiempoDeAparicion - this.score;

      if(value == 1){
        this.score ++;
      }else if(value == 2 && this.vidas.length < 3){
          this.vidas.push('../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/vida.png')
      }else if(value == 3){
        if(this.vidas.length == 1){
          this.endGame = true;
          this.descanso();
        }else{
          const insultoRandom = Math.floor(Math.random() * this.insultos.length);
          const insulto = this.insultos[insultoRandom];
          let audio = new Audio();
          audio.src = "../../../../../../../../assets/img/rutinas/emocionesYAfectos/dsyan/insultos/"+insulto+'.mp3';
          audio.load();
          audio.volume = 1;
          audio.play();
          this.vidas.pop();
        }
      }

      if(this.score < 25){
        this.dificultad = "Fácil";
        this.timerJugada = 3;
      }
      else if(this.score > 25 && this.score < 50){
        this.dificultad = "Medio";
        this.timerJugada = 2;
      }
      else{
        this.dificultad = "Experto";
        this.timerJugada = 1;
      }

      this.randomPosition();
      this.respuestaPendiente = true;
    }

    randomPosition(value?:number){
      this.tiempoDeAparicion = 1000;
      this.personajeDOM = true;
      if(this.score == 0){
        this.personaje = 0;
      }else{
        if(this.vidas.length < 3){
          var randomPersonaje = Math.floor(Math.random() * 3);
          this.personaje = randomPersonaje;
        }else{
          var randomPersonaje = Math.floor(Math.random() * 2);
          this.personaje = randomPersonaje;
        }
      }
      var randomTop =  Math.floor(Math.random() * (65 - 0 + 1) + 0);
      this.leftPosition = randomTop+'rem';
      this.leftPosition.toString();
      var randomLeft =  Math.floor(Math.random() * (28 - 0 + 1) + 0);
      this.topPosition = randomLeft+'rem';
      this.topPosition.toString();

      if(this.score < 25){ this.timerJugada = 3; }
      else if(this.score > 25 && this.score < 50){ this.timerJugada = 2; }
      else{ this.timerJugada = 1; }

      this.tiempoDeAparicion = this.tiempoDeAparicion - (this.score*10);
      clearInterval(this.intervalJugada);
      this.juegoTemp();
    }

     //DESCANSO
    descanso(){
      this.intentos++;
      let alarmInitRutina = <HTMLAudioElement>(
        document.getElementById('finEjerAudio')
      );
      alarmInitRutina.play();
      this.musicaDeFondo.pause();

      if(this.timerDescanso > 0){
        clearInterval(this.intervalDescanso);
      }
      this.intervalDescanso = setInterval(() => {
        if(this.timerDescanso > 0) {
          this.timerDescanso--;
        } else {
          clearInterval(this.intervalDescanso);
          this.inicializacion();
          this.iniciarJuego();
        }
      },1000)
    }

    regresar(){
      this.router.navigateByUrl(`/usuario`)
      .then(() => {
        window.location.reload();
      });
    }
  }

import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { dglre } from 'src/app/Models/rutinas/LenguajeComunicacion/dglre.model';
import { DGLRE1012Service } from 'src/app/services/rutinas/LenguajeComunicacion/dglre1012.service';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { SortableData } from 'ngx-sortablejs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aglco1012',
  templateUrl: './aglco1012.component.html',
  styleUrls: ['./aglco1012.component.css']
})
export class AGLCO1012Component implements OnInit {
  //VARIABLES RESULTADOS INICIO
    private sessionId: any;
    private resultsTable: resultsWithDate = {
      date: '',
      studentSessionId: '',
      grade: 0,
      round: 0,
      level: 0,
      resultDetails:[{
        possiblePoints: 0,
        points: 0,
        possiblePointsDescription: '',
        pointsDescription: ''
      }]
    }
    private round: number = 0;
    private level: number = 0;
    private studentSessionId: string = '';
  //VARIABLES RESULTADOS FIN

  //Variables DOM
  public resultadosDOM: boolean = false;
  public instruccionesDOM : boolean = true;
  public fraseAudioDOM : boolean = false;
  public fonemasDOM : boolean = false;
  public palabrasDOM : boolean = false;
  public frasesDOM : boolean = false;

  //Arreglos
  public audios = ["../../../../../.././../../assets/Audios/aglco/anteayer.mp3","../../../../../.././../../assets/Audios/aglco/biblioteca.mp3","../../../../../.././../../assets/Audios/aglco/domingo.mp3","../../../../../.././../../assets/Audios/aglco/hermano.mp3","../../../../../.././../../assets/Audios/aglco/hipocampo.mp3","../../../../../.././../../assets/Audios/aglco/inaceptable.mp3","../../../../../.././../../assets/Audios/aglco/rosita.mp3","../../../../../.././../../assets/Audios/aglco/tardecita.mp3","../../../../../.././../../assets/Audios/aglco/tarea.mp3"]
  public tiempos = [9,6,9,9,6,6,6,7,8]
  public ronda = 0;
  public fonemas: Array<string> = [];
  public palabras: Array<string> = [];
  public frases: Array<string> = [];
  
  
  public fonemasR= 0;
  public palabrasR= 0;
  public frasesR= 0;

  public fonema = '';
  public palabra = '';
  public frase = '';
  public promedioFrases = 10;


  //Temporizador
  timeDescanso: number = 60;
  timeLeft: number = 10;
  intervalDescanso:any;    
  interval:any;

  constructor(
    private _resultsService: ResultsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
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

  instruccionesFunc(){
    if(this.timeLeft > 0){
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.timeLeft == 2){
          let alarmInitRutina = <HTMLAudioElement>(
            document.getElementById('initRutAudio')
          );
          alarmInitRutina.play();
        }
      } else {
        this.instruccionesDOM  = false;
        this.fraseAudioDOM = true;
        this.reproducirFrase();
        clearInterval(this.interval);
      }
    },1000)
  }

  descanso(){
    if(this.timeDescanso > 0){
      clearInterval(this.intervalDescanso);
    }
    this.intervalDescanso = setInterval(() => {
      if(this.timeDescanso > 0) {
        this.timeDescanso--;
      } else {
        this.Inicializacion();
        clearInterval(this.intervalDescanso);
      }
    },1000)
  }

  Inicializacion(){
    //Limpiar variables
    this.resultadosDOM = false;
    this.frasesDOM = false;
    this.fonemas = [];
    this.palabras = [];
    this.frases = [];
    this.fonemasR = 0;
    this.palabrasR = 0;
    this.frasesR = 0;
    this.timeDescanso = 60;
    //Instrucciones
    this.instruccionesFunc();

  }

  reproducirFrase(){
    const time = this.tiempos[this.ronda]*1000;
    const audio = new Audio(this.audios[this.ronda])
    audio.play();
    setTimeout(()=>{
      this.fonemasDOM = true;
      this.fraseAudioDOM = false;
    }, time);
  }

  agregar(type:number){
    var correct = false
    if(type == 1){
      if(!this.fonemas.includes(this.fonema) && this.fonema){
        this.fonemas.push(this.fonema)
      }
      this.fonema = ''
    }if(type == 2){
      for (let index = 0; index < this.fonemas.length; index++) {
        if(this.palabra.startsWith(this.fonemas[index])){
          correct = true;
        }
      }
      if(!this.palabras.includes(this.palabra) && this.palabra && correct){
        this.palabras.push(this.palabra)
      }
      this.palabra = ''
    }if(type == 3){
      for (let index = 0; index < this.palabras.length; index++) {
        if(this.frase.includes(this.palabras[index])){
          correct = true;
        }else{
          correct = false;
        }
      }
      if(!this.frases.includes(this.frase) && this.frase && correct){
        this.frases.push(this.frase)
      }
      this.frase = ''
    }
  }

  revisar(){
    var porcentaje = 0;
      this.fonemasR = this.fonemas.length;
      this.palabrasR = this.palabras.length;
      this.frasesR = this.frases.length;
      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;

      //Grade
      var partialGrade = ((this.frases.length/this.promedioFrases)*100);
      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

      //LLENADO DE TABLA RESULTS FIN

      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.promedioFrases;

      //Points
      this.resultsTable.resultDetails[0].points = this.frases.length;

      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad promedio de frases a crear";

      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de frases creadas";

      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN

    porcentaje = this.frases.length * .6;
    if(this.frases.length >= porcentaje){
      this.level++;
      this.resultadosDOM = true;
      this.ronda++;
    }else{
      this.resultadosDOM = true;
      this.ronda++;
    }
    this.descanso();
  }



  //RESULTADOS INICIO
  
  getSession(){
    this._resultsService.getSession()
    .subscribe(
      (success)=>{
        if(success){
          this.sessionId = success.id;
          this.getStudentSessions();
        }else{
          //TODO: show message not session available
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  getStudentSessions(){
    this._resultsService.getStudentSessions()
    .subscribe(
      (success)=>{
        if(success){
          this.studentSessionId = success.id;
          if(success.results[success.results.length-1]){
            this.level = success.results[success.results.length-1].level-1;
            //this.contadorReactivos = this.level;
            this.round = success.results[success.results.length-1].round;
          }else{
            this.level = 0;
            this.round = 0;
          }
          this.Inicializacion();
        }
        else{
          this._resultsService.addStudentSessions(this.sessionId)
          .subscribe(
            (success)=>{
              this.studentSessionId = success.id;
              this.Inicializacion();
            },
            (error) =>{
              console.log(error)
            }
          );
        }
    },
    (error)=>{
      console.log("ERROR",error)
    });
  }

  addResult(results: resultsWithDate){
    this._resultsService.addResults(results)
    .subscribe(
      (successResponse)=>{

    },
    (error)=>{
      console.log("ERROR",error)
    });
  }

  regresar(){
    this.router.navigateByUrl(`/usuario`) 
    .then(() => {
      window.location.reload();
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { Agnco1012Service } from 'src/app/services/rutinas/DesarrolloCognitivo/Comprension/agnco1012.service';
import { agnco } from 'src/app/Models/rutinas/DesarrolloCognitivo/Comprension/agnco.model';
import { SortableData } from 'ngx-sortablejs';

@Component({
  selector: 'app-agnco1012',
  templateUrl: './agnco1012.component.html',
  styleUrls: ['./agnco1012.component.css']
})

export class AGNCO1012Component implements OnInit {
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

/* VARIABLES DE RUTINA INICIO */
  options: SortableData = {
    swapThreshold: 0.1,
    invertSwap: true,
    animation: 300,
    ghostClass: 'ghost',
    direction: 'horizontal',
    group: {
      name: 'shared',
    }
  };

  public picos:Array<any> = [];
  public patas:Array<any> = [];
  public ojos:Array<any> = [];
  public mandibulas:Array<any> = [];
  public patasMam:Array<any> = [];
  public vision:Array<any> = [];

  public elementoVista:any;
  public avesService: Array<agnco> = [];
  public mamiferosService: Array<agnco> = []; 
  avesRandom = [];
  mamiferosRandom = [];
  avesRandomCinco: Array<any> = [];
  mamiferosRandomCinco: Array<any> = [];
  respuestasAves:any = [];
  respuestasAvesAcumulado:any = [];
  respuestasMamiferosAcumulado:any = [];
  respuestasMamiferos:any = [];
  indice = 0;
  calificacion = 0;
  calificacionDOM = 0;

  //VARIABLES DOM
  instruccionesDOM = true;
  resultadosDOM = false;
  explicacionAves = false;
  ejercicioAves = false;
  explicacionMamiferos = false;
  ejercicioMamiferos = false;
  
  picosAvesDOM = false;
  ojosAvesDOM = false;
  patasAvesDOM = false;
  picosMamiferosDOM = false;
  ojosMamiferosDOM = false;
  patasMamiferosDOM = false;

  timeInstructions: number = 10;
  intervalInstructions:any;
  timeDescanso: number = 60;
  intervalDescanso:any;
  timeMostrar: number = 40;
  intervalMostrar:any;

  
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private agncoService: Agnco1012Service,
  ) { 
    
  }

  arraysCreation(){
    this.picos = [
      { valor:'1PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-41.png', 
      respuesta:'Los picos finos y alargados son para comer el néctar de las flores' },

      { valor:'2PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-42.png', 
      respuesta:'Su pico es corto, ancho y plano para comer insectos' },

      { valor:'3PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-43.png', 
      respuesta:'Los picos grandes y fuertes sirven para comer peces' },

      { valor:'4PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-39.png', 
      respuesta:'El pico corto es para comer frutos y semillas' },

      { valor:'5PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-40.png', 
      respuesta:'El pico en forma de gancho y filoso es para comer trozos de carne' },

      { valor:'6PA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-44.png', 
      respuesta:'Se alimentan de distintos tipos de comida' },

    ]
    this.mandibulas = [
      { valor:'1MM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosCraneos-27.png', respuesta:'Herbivoros: Se alimentan de plantas' },
      { valor:'2MM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosCraneos-28.png', respuesta:'Carnívoros: Comen carne, tienen colmillos grandes, largos y afilados para poder triturar la carne' },
      { valor:'3MM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosCraneos-29.png', respuesta:'Omnívoros: Comen carne animal y vegetales, tienen los colmillos un poco largos y dientes en tamaño similar' },
    ]
    this.patas = [
      { valor:'1PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/patas-31.png', respuesta:'Para pararse en superficies planas, como el suelo, no camina pero si brinca' },
      { valor:'2PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/patas-32.png', respuesta:'Cuatro dedos al frente, para colgarse de las ramas o estructuras, sus patas son muy cortas' },
      { valor:'3PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/patas-33.png', respuesta:'Forma de gancho, sus dedos son grandes y fuertes, con uñas bien afiladas para poder atrapar a sus víctimas en pleno vuelo' },
      { valor:'4PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/patas-34.png', respuesta:'Dos dedos adelante y dos dedos atrás en forma de gancho para pararse en las ramas' },
      { valor:'5PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/patas-35.png', respuesta:'Tres dedos hacia adelante (los dedos, 2, 3 y 4) y el primero hacia atrás, para caminar en el suelo' },
      { valor:'6PAA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Patas-38.png', respuesta:'Sirven para nadar y remar, los cuatro dedos hacia adelante con pliegues entre los dedos' },
    ]
    this.patasMam = [
      { valor:'1PM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosPatas-30.png', respuesta:'Excavación: Pueden excavar en la tierra para encontrar insectos' },
      { valor:'2PM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosPatas-31.png', respuesta:'Aprención de objetos: Pueden agarrar comida con sus manos o patas que tienen dedos' },
      { valor:'3PM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosPatas-32.png', respuesta:'Natación: Como las aletas en ballenas que le ayudan a nadar' },
      { valor:'4PM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosPatas-33.png', respuesta:'Marcha: Las patas marchadoras pueden acabar en uñas o dedos' },

    ]
    this.ojos = [
      { valor:'1OA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-36.png', respuesta:'Visión monocular: Los ojos están en ambos lados de la cabeza, pueden ver muy bien a los lados y enfrente' },
      { valor:'2OA', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/Ojos-37.png', respuesta:'Visión binocular: Sus ojos están juntos enfrente de la cabeza, puede ver bien a sus presas' },
    ]
    this.vision = [
      { valor:'1VM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosVista-25.png', respuesta:'Visión Monocular: Pueden ver muy bien todo lo que les rodea, pueden ver a que distancia están sus depredadores, sus ojos están en los dos lados de la cabeza' },      
      { valor:'2VM', imagen:'../assets/img/rutinas/desarrolloCognitivo/agnco/MamiferosVista-26.png', respuesta:'Visión Binocular: Con sus ojos calculan muy bien las distancias, sus ojos están al frente de la cabeza' }
    ]
  }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.arraysCreation();
    this.timeDescanso = 60;
    this.calificacionDOM = 0;
    this.explicacionAves = false;
    this.ejercicioAves = false;
    this.explicacionMamiferos = false;
    this.ejercicioMamiferos = false;
    this.patasMamiferosDOM = false;
    this.patasAvesDOM = false;
    this.resultadosDOM = false;    
    this.indice = 0;
    this.avesService = this.agncoService.getAves();
    this.mamiferosService = this.agncoService.getMamiferos();
    this.avesRandom = this.arregloRandom(this.avesService.length, this.avesRandom, this.avesService);
    this.mamiferosRandom = this.arregloRandom(this.mamiferosService.length, this.mamiferosRandom, this.mamiferosService);
    this.CreacionArreglos();
    this.instrucciones();
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

  arregloRandom(cantidadDeAudios: any, arregloDestino:any, arregloFuente: any){
    var valor = cantidadDeAudios;
    var fuente = arregloFuente;
    var destino = arregloDestino;
    var arregloRandom = [];
    for (let index = 0; index < valor; index++) {
      arregloRandom[index] = index;
    }
    arregloRandom.sort(() => Math.random() - 0.2);
    for (let index = 0; index < valor; index++) {
      destino[index] = fuente[arregloRandom[index]];
    }
    return destino;
  }

  CreacionArreglos(){
    //Imagenes desordenadas listas para mostrar a memorizar
    for (let index = 0; index < 5; index++) {
      this.avesRandomCinco[index] = this.avesRandom[index];
      this.mamiferosRandomCinco[index] = this.mamiferosRandom[index];
    }
  }

  // INSTRUCCIONES
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
          this.instruccionesDOM = false;
          this.explicacionAves = true;
          this.picosAvesDOM = true;
          clearInterval(this.intervalInstructions);
      }
    },1000)
  }

  avesRutina(){
    if(this.indice <= 4){
      this.explicacionAves = false; 
      this.ejercicioAves = true;
      this.timeMostrar = 40;
      this.elementoVista = this.avesRandomCinco[this.indice];
      this.mostrarElemento(1);
    }else{      
      this.ejercicioAves = false;
      this.explicacionMamiferos = true;
      this.picosMamiferosDOM = true;    
      this.indice = 0;  
    }
  }

  mamiferosRutina(){
    if(this.indice <= 4){
      this.explicacionMamiferos = false;
      this.ejercicioMamiferos = true;
      this.timeMostrar = 40;
      this.elementoVista = this.mamiferosRandomCinco[this.indice];
      this.mostrarElemento(2);
    }else{      
      this.revisar();
    }
  }

  mostrarElemento(type:number){
    this.indice++;
    console.log(this.indice)

    this.intervalMostrar = setInterval(() => {
      if(this.timeMostrar > 0) {
        this.timeMostrar--;
      } else {
        if(this.indice <= 5){
          if(type == 1){
            this.arraysCreation();
            this.respuestasAvesAcumulado.push(this.respuestasAves);
            this.respuestasAves = [];
            clearInterval(this.intervalMostrar);
            this.avesRutina()
          }else{
            this.arraysCreation();
            this.respuestasMamiferosAcumulado.push(this.respuestasMamiferos);
            this.respuestasMamiferos = [];
            clearInterval(this.intervalMostrar);
            this.mamiferosRutina()
          }
        }
      }
    },1000)
  }

  //DESCANSO
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

  limpiarDragAndDrop(type:number){
    this.arraysCreation();
    if(type == 1){
      this.respuestasAves = [];
    }else if(type == 2){
      this.respuestasMamiferos = [];
    }
  }

  revisar(){    
    this.descanso();
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();

    for(let i = 0; i<5; i++){
      for (let j = 0; j < this.respuestasAvesAcumulado[i].length; j++) {
        if(this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].boca ||
          this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].ojos ||
          this.respuestasAvesAcumulado[i][j].valor == this.avesRandomCinco[j].patas ){
            console.log("Correcta para aves valor = ", this.respuestasAvesAcumulado[i][j], "boca ", this.avesRandomCinco[j].boca, "ojos ", this.avesRandomCinco[j].ojos, "patas ", this.avesRandomCinco[j].patas)
            this.calificacion++
        }    
      }
    }

    
    for(let i = 0; i<5; i++){
      for (let j = 0; j < this.respuestasMamiferosAcumulado[i].length; j++) {
        if(this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].boca ||
          this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].ojos ||
          this.respuestasMamiferosAcumulado[i][j].valor == this.mamiferosRandomCinco[j].patas ){
            console.log("Correcta para mamiferos valor = ", this.respuestasMamiferosAcumulado[i][j], "mandibula ", this.mamiferosRandomCinco[j].boca, "ojos ", this.mamiferosRandomCinco[j].ojos, "patas ", this.mamiferosRandomCinco[j].patas)
            this.calificacion++
        } 
      }
    }

    this.calificacionDOM = this.calificacion;

    var porcentaje = 0;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/30)*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = 30;
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles palabras creadas";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de palabras correctas";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
   porcentaje = 30 * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      this.ejercicioMamiferos = false;
      this.resultadosDOM = true;
    }else{
      this.ejercicioMamiferos = false;
      this.resultadosDOM = true;    
    }
    this.calificacion = 0;
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
}
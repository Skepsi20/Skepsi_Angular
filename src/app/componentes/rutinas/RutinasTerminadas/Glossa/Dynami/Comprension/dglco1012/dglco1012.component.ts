import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dglco1012',
  templateUrl: './dglco1012.component.html',
  styleUrls: ['./dglco1012.component.css']
})
export class DGLCO1012Component implements OnInit {
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
  public reactivos = [
    {
      silabas: ['to','ji','es','la','tu','ri','pa','ra','co','po','me','che','mo','ta','so','za','fa','sa','no','chi','ma'],
      respuestas: ['pato','sopa','mochila','taco','estuche','risa','sala','jirafa','mapache','mariposa','ramo','mesa','cometa','masa','rama','taza','rico','coche','noche']
    },
    {
      silabas: ['li','zo','hi','rro','bo','co','tín','no','pa','ja','pe','bu','bro','ta','ma','que','te','bar','lo'],
      respuestas: ['libro','patín','jarro','buzo','mano','loma','hija','malo','buque','perro','barco','bote','corro','pelota','bora']
    },
    {
      silabas: ['que','lor','ro','es','tad','xi','he','ja','so','bur','li','chi','fu','zo','tu','ta','bu','ca','ber','che','sa'],
      respuestas: ['queso','burbuja','cazo','calor','libertad','caro','hechizo','roja','chica','futuro','chita','casa','estuche','buzo','taxi','roca']
    },
    {
      silabas: ['que','há','gar','vi','la','bi','za','dad','ble','to','res','li','ta','ser','in','ri','pe','bra','dor','ho'],
      respuestas: ['labrador','resta','tabique','hábito','garza','taza','braza','respetabilidad','hola','inservible','braza','riqueza','resto','hogar','lila']
    },
    {
      silabas: ['li','sa','pel','ca','piz','co','na','che','to','ta','lá','ju','ga','me','bro','ven','gue','te','pa','mi'],
      respuestas: ['libro','casa','juguete','gato','lápiz','coche','mesa','camisa','ventana','papel','cometa','pata','pizca','cachete','tapa','nata']
    },
    {
      silabas: ['nio','lla','le','pu','ho','na','co','fa','ji','ve','ra','za','cé','bre','ge','ra','do','ta','ne','ria','jo','com'],
      respuestas: ['llave','conejo','jirafa','genio','geranio','cobre','célebre','zanahoria','computadora','rata','raza','nevería','dona','taza','hora','nata']
    },
    {
      silabas: ['be','ra','rin','ta','co','lu','ya','rra','la','to','min','do','la','pa','so','gui','cho','te','pa','que','go'],
      respuestas: ['lupa','raqueta','domingo','guitarra','chocolate','payaso','pala','techo','latoso','laberinto','taco','gota','gorra','codo']
    },
    {
      silabas: ['bo','sa','da','bre','ma','no','prin','glo','sol','che','so','bru','blu','na','ro','ja','do','bro','som','ce','lu'],
      respuestas: ['dado','broche','princesa','noche','blusa','sombrero','globo','noche','bruja','broma','sobre','soldado','sano','luna']
    },
    {
      silabas: ['je','to','za','cu','ras','la','ma','pa','tu','cha','ti','pie','sub','gri','cán','ra','dra','llo','jau','no','ri','ta'],
      respuestas: ['taza','chato','cuchara','piedra','grillo','submarino','zapato','tijeras','tucán','pieza','jaula','grita','rama','drama','pato']
    },
    {
      silabas: ['co','ga','pue','ta','bi','be','es','hor','ham','a','blo','ci','ja','mi','bur','fo','cle','que','bla','sa','gue'],
      respuestas: ['gata','hormiga','amiga','pueblo','bicicleta','establo','abeja','tabla','hamburguesa','foco','cita']
    }
  ]

  public silabasRandom = [];
  public respuestasRandom = [''];
  public respuestasUsuario = [''];

  public silabaDOM:any = [];
  public silabasRespuesta:any = [];

  public palabraUsuario: string = '';
  public instruccionesDOM: boolean = true;
  public mostrarSilabasDOM: boolean = false;
  public resultadosDOM: boolean = false;
  public actividadDOM: boolean = false;
  public silabaLista: boolean = false;

  calificacionDOM: number = 0;
  cantidadFigurasDOM: any;
  calificacion: number = 0;
  timeLeft: number = 10;
  timeLeftThree: number = 60;
  interval:any;
  interval3:any;
  ronda = 0;
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.mostrarSilabasDOM = false;
    this.resultadosDOM = false;
    this.actividadDOM = false;
    this.timeLeftThree = 60;
    this.respuestasUsuario = [''];
    this.silabasRandom = [];
    this.respuestasRandom = [];
    this.silabasRandom = this.arregloRandom(this.reactivos[this.ronda].silabas.length, this.silabasRandom, this.reactivos[this.ronda].silabas);
    this.respuestasRandom = this.arregloRandom(this.reactivos[this.ronda].respuestas.length, this.respuestasRandom, this.reactivos[this.ronda].respuestas);
    this.instruccionesFunc();
  }

  arregloRandom(cantidadDeReactivos: any, arregloDestino:any, arregloFuente: any){
    var valor = cantidadDeReactivos;
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
      } else {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initRutAudio')
        );
        alarmInitRutina.play();
        this.instruccionesDOM = false;
        this.mostrarSilabasDOM = true;
        this.mostrarSilabas();
        clearInterval(this.interval);
      }
    },1000)
  }

  descanso(){
    if(this.timeLeftThree > 0){
      clearInterval(this.interval3);
    }
    this.interval3 = setInterval(() => {
      if(this.timeLeftThree > 0) {
        this.timeLeftThree--;
      } else {
        this.Inicializacion();
        clearInterval(this.interval3);
      }
    },1000)
  }


  mostrarSilabas(){
    var aux = 0;
    var tiempo = setInterval(()=>{
      if(aux < this.silabasRandom.length){
        this.silabaDOM[0] = this.silabasRandom[aux];
        this.silabaLista = true;
        aux++;
      }else if(aux >= this.silabasRandom.length){
        clearInterval(tiempo);
        this.actividadDOM = true;
        this.mostrarSilabasDOM = false;
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initEjerAudio')
        );
        alarmInitRutina.play();
      }
    },1000);

  }

  agregarPalabra(){
    this.respuestasUsuario.push(this.palabraUsuario);
    this.palabraUsuario = '';
  }

  revisar(){
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();
    var porcentaje = 0;
    for (let index = 0; index < this.respuestasRandom.length; index++) {
      if(this.respuestasRandom.includes(this.respuestasUsuario[index])){
        this.calificacion++;
      }
    }

    this.cantidadFigurasDOM = this.reactivos[this.ronda].respuestas.length;
    this.calificacionDOM = this.calificacion;

      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;

      //Grade
      var partialGrade = ((this.calificacion/this.respuestasRandom.length)*100);
      this.resultsTable.grade = partialGrade;

      //Round
      this.resultsTable.round = this.round;

      //level
      this.resultsTable.level = this.level+1;

      //LLENADO DE TABLA RESULTS FIN

      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = this.respuestasRandom.length;

      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;

      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles palabras creadas";

      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de palabras correctas";

      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN

    porcentaje = this.respuestasRandom.length * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;
      this.mostrarSilabasDOM = true;
      this.actividadDOM = false;
    }else{
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;
      this.mostrarSilabasDOM = true;
      this.actividadDOM = false;
    }
    this.calificacion = 0;
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

import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';

@Component({
  selector: 'app-eglco1012',
  templateUrl: './eglco1012.component.html',
  styleUrls: ['./eglco1012.component.css']
})
export class EGLCO1012Component implements OnInit {
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
  public starts = [
    {
      silaba: ['ma'],
      respuestas: ['maleta','mamá','manzana','mariposa','mano','mago','mapa','maceta','madera','maíz','maratón','masa','medalla','madre','manopla','mandona','mazorca','maestra','madrugar','magia','manguera','mango','mantequilla','marsupial','macarrón','magnesio','machete','manta','magma','mancha','mandarina','marino','malabarista']      
    },{
      silaba: ['bu'],
      respuestas: ['buzo','bullicio','buscar','burbuja','búfalo','bullicio','burlón','búsqueda','bueno','búho','burro','bullicio','buitre','bujía','buñuelo','butaca','bulto','bufanda','buque','buitre','buffet','buscador','bucear','budismo','bucanero']      
    },{
      silaba: ['pe'],
      respuestas: ['pelota','pez','pedazo','peligro','peinar','pescado','pelaje','penacho','pecera','pensamiento','pegajoso','pelusa','pegar','peluquero','pedir','pelar','peludo','peine','peluca','pelea','pechuga','periódico','penalti','peleador','pelador','pedal','peleonero','pelícano','pellejo','pepino','pediatra','pedalear','pelirrojo']      
    },{
      silaba: ['si'],
      respuestas: ['sillón','silbar','situación','siempre','siempre','siete','sílaba','silencio','signo','sirena','silbato','silla','simio','síntoma','simetría','sinopsis','silbato','singular','sinfín','simulacro','sinfonía','simpatía','simple','silvestre','similar','silueta','siglo','símbolo','silueta','sincero','sigla','sierra','siempre','simular','síntesis']      
    },{
      silaba: ['ve'],
      respuestas: ['verde','velero','ventana','veloz','veces','vegetación','veneno','venus','vender','ver','veinticinco','verso','velero','veo','verdad','vegetariano','vehículo','verano','veneno','veneno','vencer','vegetal','vecino','veraz','verdura','vena','venecia','veintiocho','verificar','velocidad','ventrílocuo','vertical','vela','venado','vestido']      
    },    
  ] 
  public include = [
    {
      silaba: ['ta'],
      respuestas: ['computadora','pelota','pirata','azafata','ermitaño','tinta','tormenta','pimienta','raqueta','anota','fiesta','atajar','atar','lista','tabla','paleta','importante','establecer','resultado','bastante','espectacular','maleta','tarea','destacar','inestable','alimentación']      
    },{
      silaba: ['li'],
      respuestas: ['película','solicitar','inteligente','utilizar','caliente','feliz','delicioso','salida','alimento','libro','felicidad','valioso','peligro','familia','helicóptero','listo','alimentar','felicitar','salir','eliminar','militar','calificar','policía','localizar','remolino','lista','libreta','licuado']      
    },{
      silaba: ['pre'],
      respuestas: ['presentar','expresar','aprender','presente','sorpresa','pregunta','aprendizaje','preguntar','siempre','apreciar','precio','prestar','premio','apretar','comprender','premio','preposición','imprenta','comprender','empresa','presente','apretar']      
    },{
      silaba: ['la'],
      respuestas: ['largo','relato','escuela','elaborar','colaborar','labor','relatar','dilatar','palabra','helado','isla','ola','jaula','vela','salario','película','lado','fila','lavar','ladrar','brújula','tela','cápsula','simulacro','lavar','ladrar','sala','laguna','novela','perla','águila']      
    },{
      silaba: ['bra'],
      respuestas: ['sombra','celebra','palabra','abrazar','siembra','brazo','alfombra','brazalete','acostumbrado','alumbrado','sobra','cabra','celebrar','quebrar','cobraron','sobraron','penumbra','branquias','culebra','cebra','membrana','obra']      
    },    
  ] 

  public palabrasRespuesta = [''];
  public palabraUsuario = '';
  public respuestasUsuarioStarts = [''];
  public respuestasUsuarioInclude = [''];
  public palabrasRespuestaStart = [''];
  public palabrasRespuestaInclude = [''];
  public startActual:any;
  public includeActual:any;
  startCalif = 0  
  includeCalif = 0


  //VARIABLES DOM
  public instruccionesDOM = true;
  public startDOM = false;
  public includeDOM = false;
  public resultadosDOM = false;
  public calificacionStartDOM: number = 0;
  public calificacionIncludeDOM: number = 0;
  public cantidadFigurasStartDOM: any;
  public cantidadFigurasIncludeDOM: any;

  calificacion: number = 0;
  ronda = 0;
  timeInstructions: number = 10;
  intervalInstructions:any;
  timeStart: number = 180;
  intervalStart:any;
  timeInclude: number = 180;
  intervalInclude:any;
  timeDescanso: number = 60;
  intervalDescanso:any;
/* VARIABLES DE RUTINA FIN */


  constructor(
    private _resultsService: ResultsService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    setInterval(()=> this.statusUpdate(),30000);
    this.getSession();
  }

  Inicializacion(){
    this.instruccionesDOM = true;
    this.startDOM = false;
    this.includeDOM = false;
    this.resultadosDOM = false;
    this.startActual = [];
    this.includeActual = [];
    this.respuestasUsuarioStarts = [];
    this.respuestasUsuarioInclude = [];
    this.timeStart = 180;
    this.timeInclude = 180;
    this.timeDescanso = 60;
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
          this.startDOM = true;
          this.startActual = this.starts[this.ronda].silaba;
          this.includeActual = this.include[this.ronda].silaba;
          this.palabrasRespuestaStart = this.starts[this.ronda].respuestas;
          this.palabrasRespuestaInclude = this.include[this.ronda].respuestas;
          this.startTimer();
          clearInterval(this.intervalInstructions);
      }
    },1000)
  }

  //PALABRAS QUE EMPIECEN 
  startTimer(){
    if(this.timeStart > 0){
      clearInterval(this.intervalStart);
    }
    this.intervalStart = setInterval(() => {
      if(this.timeStart > 0) {
        this.timeStart--;
      } else {
        let alarmInitRutina = <HTMLAudioElement>(
          document.getElementById('initEjerAudio')
        );
        alarmInitRutina.play();
        this.startDOM = false;
        this.includeDOM = true;
        this.includeTimer();
        clearInterval(this.intervalStart);
      }
    },1000)
  }

  //PALABRAS QUE CONTENGAN
  includeTimer(){
    if(this.timeInclude > 0){
      clearInterval(this.intervalInclude);
    }
    this.intervalInclude = setInterval(() => {
      if(this.timeInclude > 0) {
        this.timeInclude--;
      } else {
        this.includeDOM = false;
        this.resultadosDOM = true;
        this.revisar();
        clearInterval(this.intervalInclude);
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

  agregarPalabra(destino:any){
    if(destino == 1){
      this.respuestasUsuarioStarts.push(this.palabraUsuario)
    }else{
      this.respuestasUsuarioInclude.push(this.palabraUsuario)
    }
    this.palabraUsuario = '';
  }
  
  revisar(){
    let alarmInitRutina = <HTMLAudioElement>(
      document.getElementById('finEjerAudio')
    );
    alarmInitRutina.play();
    var porcentaje = 0;
    this.startCalif = 0;
    this.includeCalif = 0;
    var gradeVar = this.starts[this.ronda].respuestas.length + this.include[this.ronda].respuestas.length;

    //Calificacion start
    for (let index = 0; index < this.starts[this.ronda].respuestas.length; index++) {
      if(this.starts[this.ronda].respuestas.includes(this.respuestasUsuarioStarts[index])){
        this.startCalif++;
        this.calificacion++;
      }
    }    
    //Calificacion include
    for (let index = 0; index < this.include[this.ronda].respuestas.length; index++) {
      if(this.include[this.ronda].respuestas.includes(this.respuestasUsuarioInclude[index])){
        this.includeCalif++;
        this.calificacion++;
      }
    }

    this.cantidadFigurasStartDOM = this.starts[this.ronda].respuestas.length;
    this.cantidadFigurasIncludeDOM = this.include[this.ronda].respuestas.length;
    this.calificacionStartDOM = this.startCalif;
    this.calificacionIncludeDOM = this.includeCalif;
  
      //LLENADO DE TABLA RESULTS INICIO
      this.round++;
      //StudentSessionId
      this.resultsTable.studentSessionId = this.studentSessionId;
  
      //Grade
      var partialGrade = ((this.calificacion/gradeVar)*100);
      this.resultsTable.grade = partialGrade;
  
      //Round
      this.resultsTable.round = this.round;
  
      //level
      this.resultsTable.level = this.level+1;
  
      //LLENADO DE TABLA RESULTS FIN
  
      //LLENADO DE TABLA RESULTS DETAILS INICIO
      //Possible points
      this.resultsTable.resultDetails[0].possiblePoints = gradeVar;
  
      //Points
      this.resultsTable.resultDetails[0].points = this.calificacion;
  
      //Possible points description
      this.resultsTable.resultDetails[0].possiblePointsDescription = "Cantidad de posibles palabras creadas";
  
      //Points description
      this.resultsTable.resultDetails[0].pointsDescription ="Cantidad de palabras correctas";
  
      //Metodo para crear resultado
      this.addResult(this.resultsTable);
      //LLENADO DE TABLA RESULTS DETAILS FIN
  
    porcentaje = gradeVar * .6;
    if(this.calificacion >= porcentaje){
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;
      this.includeDOM = false;
    }else{
      this.level++;
      if(this.ronda >= 10){
        this.ronda = 0;
      }else{
        this.ronda++;
      }
      this.resultadosDOM = true;    
      this.includeDOM = false;
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
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CalendarOptions, render } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { CookieService } from 'ngx-cookie-service';
import { StudentService } from 'src/app/services/Auth/student.service';
import { VentasService } from 'src/app/services/Planes/ventas.service';
import { RutinasFechadasService } from 'src/app/services/Plantillas/rutinas-fechadas.service';
import { ResultsService } from 'src/app/services/Resultados/results.service';
import { ResultadosRutinasService } from 'src/app/services/rutinas/resultados-rutinas.service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  showFiller = false;
  opcionMenu:any;
  rutinaSeleccionada = false;
  rutinasHechas = 0;
  rutinasPendientes = 0;
  title:any;
  fecha:any;
  description:any;
  estadisticaSeleccionada: string = '';
  datosDelTutor:any;
  mostrarClendario = false;
  currentCourse:any;
  todaySession: any;
  nextSession:any;
  resultadosPorRutina = false;
  todasLasSesiones: Array<any> = [];
  pilarRoutine:any;
  isHoliday:any;
  meetingURL = '';
  meetingPassword = '';
  planStatus!: string;
  student:any = {
    name: '',
    lastName: '',
    password: '',
    currentPassword:'',
    confirmedPassword:'',
    profileImageUrl: '',
    institution: ''
  }
  hide = true;
  mobile:any;

  public mostrarAvatar = false;
  public rutinasConResultados: Array<any> = [];
  public avatares = [
    'Personajes-14.png',
    'Personajes-12.png',
    'Personajes-09.png',
    'Personajes-10.png',
    'Personajes-11.png',
    'Personajes-08.png',
    'Personajes-07.png',
    'Personajes-06.png',
    'Personajes-05.png',
    'Personajes-15.png',
    'Personajes-13.png',
    'Personajes-04.png',
    'Personajes-03.png',
    'Personajes-02.png',
    'Personajes-01.png',
  ]

  public events: any = [];
  public cookieUser : string = '';
  public suspended = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    eventClick: this.handleDateClick.bind(this),
    locale: esLocale
  };

  constructor(
    private snackbar: MatSnackBar,
    private resultadosService: ResultadosRutinasService,
    private tutorService:TutorService,
    private ventasService: VentasService,
    private resultsService: ResultsService,
    private studentService: StudentService,
    private cookieService : CookieService,
    private rutinasService: RutinasFechadasService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cookieUser = this.cookieService.get('accessToken');
    if(!this.cookieUser){
      this.router.navigate(['inicio']);
    }
    if((navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/i))){
      this.mobile = true;
    }else{
      this.mobile = false;
    }


    if(localStorage.getItem('vista')){
      this.opcionMenu = localStorage.getItem('vista');
    }
    const token = this.cookieService.get('accessToken');
    var tokenDecoded:any = jwt_decode(token);
    this.suspended = tokenDecoded.IsSuspended;
    this.planStatus = tokenDecoded.ActiveSubscription;

    if(this.suspended){
      console.log("ESTA SUSPENDIDO")
    }

    if(this.planStatus == 'True' && this.suspended == 'False'){
    //Todas las sesiones del estudiante
    this.studentService.allStudentSessions()
    .subscribe(
      (success)=>{
        this.todasLasSesiones = success;
        for (let index = 0; index < this.todasLasSesiones.length; index++) {
          var color = ''
          var pilar = ''
          if(this.todasLasSesiones[index].routine.pillarType == 4){
            pilar = 'Mathimatiki'
            color = '#0B2A4A'
          }else  if(this.todasLasSesiones[index].routine.pillarType == 3){
            pilar = 'Glossa'
            color = '#4ACFC6'
          }else  if(this.todasLasSesiones[index].routine.pillarType == 2){
            pilar = 'Synaisthimata'
            color = '#EA4758'
          }else{
            pilar = 'Gnostiki'
            color = '#F4D34C'
          }
          var date = new Date(this.todasLasSesiones[index].date);

          this.events[index] = {
            title: this.todasLasSesiones[index].routine.name,
            date: date.toISOString().split('T')[0],
            color: color,
            description: this.todasLasSesiones[index].routine.description,
            pilar: pilar,
            holiday: false,
          }
        }
      //Datos del tutor
      this.tutorService.getStudentTutor()
      .subscribe(
        (success)=>{
          this.datosDelTutor = success;
          if(!this.datosDelTutor.profileImageUrl){
            this.datosDelTutor.profileImageUrl = 'Personajes-03.png'
          }
        },(error)=>{
          console.log(error);
        }
      )
      //Dias festivos
      this.rutinasService.getHolidays()
      .subscribe(
        (success)=>{
          console.log("DIAS FESTIVOS",success)
          for (let index = 0; index < success.length; index++) {
            this.events[this.todasLasSesiones.length+index] = {
              title: success[index].name,
              date: success[index].date,
              color: '#a5b9c0',
              holiday: true,
            }
          }
        },(error)=>{
          console.log(error);
        }
      )
      },(error)=>{
        console.log(error);
      }
    )
    }

     //Datos del estudiante
    this.studentService.getStudentData()
    .subscribe(
      (success)=>{
        console.log("DATOS DEL ESTUDIANTE",success)
        this.student.name = success.firstName;
        this.student.lastName = success.lastName;
        this.student.profileImageUrl = success.profileImageUrl;
        this.student.institution = success.institution;
      if(!this.student.profileImageUrl){
          this.student.profileImageUrl = 'Personajes-03.png'
        }
      },(error)=>{
        console.log(error);
      }
    )

    if(this.planStatus == 'True' && this.suspended =='False'){
    //Datos del paquete
    this.ventasService.getPaqueteSuscrito()
    .subscribe(
      (success)=>{
        this.currentCourse = success
        console.log("DATOS Del plan loggeeado",success)

        //Datos de la sesion de hoy
        this.tutorService.getSessionId(this.currentCourse.id)
        .subscribe(
          (success)=>{
            this.todaySession = success;
            console.log("DATOS De la sesion de hoy",success)
          },(error)=>{
            console.log(error);
          }
        )

        this.resultsService.getSession()
        .subscribe(
          (success)=>{
            if(!success){
              this.resultsService.getNextSession(this.currentCourse.id)
              .subscribe(
                (success)=>{
                  this.nextSession = success
                },(error)=>{
                  console.log(error)
                }
              )
            }else{
              this.meetingURL = success.meetingUrl;
              this.meetingPassword = success.meetingPassword;
            }
            console.log(success,"PARA LA LIGA DE ZOOM")
          },(error)=>{
            console.log(error)
          }
        )
      },(error)=>{
        console.log(error);
      }
    )
    }

  }

  handleDateClick(arg:any){
    this.title = arg.event._def.title;
    console.log(arg)
    this.fecha = arg.event._instance.range.start;
    this.description = arg.event._def.extendedProps.description;
    this.pilarRoutine = arg.event._def.extendedProps.pilar;
    this.isHoliday = arg.event._def.extendedProps.holiday;
    this.rutinaSeleccionada = true;
  }

  seleccionMenu(vista:string){
    localStorage.setItem('vista', vista);
    this.opcionMenu = vista;
  }

  volverEstadisticas(){
    this.estadisticaSeleccionada = '';
  }

  buscarEstadistica(area:string){
    this.estadisticaSeleccionada = area;
    this.resultadosService.searchByPilar(this.estadisticaSeleccionada)
    .subscribe(
      (success)=>{
        this.rutinasConResultados = success;
        console.log(this.rutinasConResultados);
      },(error)=>{
        console.log(error);
      }
    )
  }

  updateStudentName(){
    const request = {
      firstName: this.student.name,
      lastName: this.student.lastName
    }
    this.studentService.updateName(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Nombre actualizado',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },(error)=>{
        this.snackbar.open('Error actualizando el nombre',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  updateStudentPassword(){
    const request = {
      password: this.student.password,
      confirmedPassword: this.student.confirmedPassword,
      currentPassword: this.student.currentPassword
    }
    this.studentService.updatePassword(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Contraseña actualizada',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },(error)=>{
        this.snackbar.open('Error actualizando la contraseña',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  mostrarAvatares(){
    this.mostrarAvatar = !this.mostrarAvatar;
  }
  mostrarCalendarioToggle(){
    this.mostrarClendario = !this.mostrarClendario;
  }

  guardarAvatar(avatar:any){
    this.student.profileImageUrl = avatar;
    this.studentService.updateImage(this.student.profileImageUrl)
    .subscribe(
      (success)=>{
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

  mostrarAvatarActual(){
    this.mostrarAvatares();
  }

  buscarResultadosPorRutina(rutina:any){
    this.resultadosPorRutina = !this.resultadosPorRutina;
    console.log("LA RUTINA",rutina)
  }

  logOut(){
    this.cookieService.delete('accessToken');
    this.ngOnInit();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { CalendarOptions, render } from '@fullcalendar/angular';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import esLocale from '@fullcalendar/core/locales/es';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RutinasFechadasService } from 'src/app/services/Plantillas/rutinas-fechadas.service';

@Component({
  selector: 'app-entrenador-panel',
  templateUrl: './entrenador-panel.component.html',
  styleUrls: ['./entrenador-panel.component.css']
})
export class EntrenadorPanelComponent implements OnInit {
  opcionMenu:any;
  mostrarClendario = false;
  rutinaSeleccionada = false;
  title:any;
  fecha:any;
  description:any;
  grupos: Array<any> = [];
  nombreTutor: string = '';
  grupoSeleccionado= false;
  mostrarAvatar = false;
  hide = true;
  rutinaArg = '';
  horarioArg = '';
  rutinaDescArg = '';
  estadoDeRutina = '';
  zoomLinkProps = '';
  zoomPasswordProps = '';
  todasLasSesiones: Array<any> = [];
  isHoliday:any;


  tutor:any = {
    name: '',
    lastName: '',
    password: '',
    currentPassword:'',
    confirmedPassword:'',
    profileImageUrl: '',
    description: ''
  }
  public events: any = [{}]
  public cookieUser : string = '';
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

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    eventClick: this.handleDateClick.bind(this),
    locale: esLocale
  };


  constructor(
    private snackbar: MatSnackBar,
    private cookieService : CookieService,
    private rutinasService: RutinasFechadasService,
    private router: Router,
    private readonly tutorService: TutorService,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.cookieUser = this.cookieService.get('accessToken');
    if(!this.cookieUser){
      this.router.navigate(['inicio']);
    }
    if(localStorage.getItem('vista')){
      this.opcionMenu = localStorage.getItem('vista');
    }


    //Grupos del maestro
    this.tutorService.getDashboardGroups()
    .subscribe(
      (success)=>{
        console.log("META?",success)
        this.grupos = success;
        for(let i=0; i<this.grupos.length; i++){
          this.grupos[i].plan.planDays = [];
          if(this.grupos[i].plan.planDetail.onMonday)this.grupos[i].plan.planDays.push("Lunes")
          if(this.grupos[i].plan.planDetail.onTuesday)this.grupos[i].plan.planDays.push("Martes")
          if(this.grupos[i].plan.planDetail.onWednesday)this.grupos[i].plan.planDays.push("Miércoles")
          if(this.grupos[i].plan.planDetail.onThursday)this.grupos[i].plan.planDays.push("Jueves")
          if(this.grupos[i].plan.planDetail.onFriday)this.grupos[i].plan.planDays.push("Viernes")
          if(this.grupos[i].plan.planDetail.onSaturday)this.grupos[i].plan.planDays.push("Sábado")
          if(this.grupos[i].plan.planDetail.onSunday)this.grupos[i].plan.planDays.push("Domingo")
        }
      },(error)=>{
        console.log(error)
      }
    )


    //Datos del tutor
    this.tutorService.getTutorData()
    .subscribe(
      (success)=>{
        this.tutor.name = success.firstName;
        this.tutor.lastName = success.lastName;
        this.tutor.profileImageUrl = success.profileImageUrl;
        this.tutor.description = success.profileDescription;
      if(!this.tutor.profileImageUrl){
          this.tutor.profileImageUrl = 'Personajes-03.png'
        }
      },(error)=>{
        console.log(error);
      }
    )

    //Dias festivos
    this.rutinasService.getHolidays()
    .subscribe(
      (successResponse)=>{
        for (let index = 0; index < successResponse.length; index++) {
          this.events[index] = {
            title: successResponse[index].name,
            date: successResponse[index].date,
            color: '#a5b9c0',
            holiday: true,
          }
        }

        //Sesiones del tutor
        this.tutorService.allTutorSessions()
        .subscribe(
          (success)=>{
            this.todasLasSesiones = success;
            console.log("METAAAA", success)
            var counter = 0;
            for (let x = 0; x < success.length; x++) {
              var randomColor = Math.floor(Math.random()*16777215).toString(16);
              for (let y = 0; y < success[x].sessions.length; y++) {
                var date = new Date(success[x].sessions[y].date);
                this.events[counter+successResponse.length] = {
                  title: success[x].sessions[y].routine.name,
                  date: date.toISOString().split('T')[0],
                  color: '#'+randomColor,
                  descripcion: success[x].plan.description,
                  horario: success[x].plan.schedule,
                  routine: success[x].sessions[y].routine.name,
                  routineDescription: success[x].sessions[y].routine.description,
                  zoomLink: success[x].sessions[y].meetingUrl,
                  zoomPassword: success[x].sessions[y].meetingPassword,
                  holiday: false,
                }
                counter++;
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


  seleccionMenu(vista:string){
    localStorage.setItem('vista', vista);
    this.opcionMenu = vista;
  }

  mostrarAvatares(){
    this.mostrarAvatar = !this.mostrarAvatar;
  }

  mostrarAvatarActual(){
    this.mostrarAvatares();
  }

  guardarAvatar(avatar:any){
    this.tutor.profileImageUrl = avatar;
    this.tutorService.updateImage(this.tutor.profileImageUrl)
    .subscribe(
      (success)=>{
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

  handleDateClick(arg:any){
    this.title = arg.event._def.title;
    console.log(arg)
    this.fecha = arg.event._instance.range.start;
    this.rutinaArg = arg.event._def.extendedProps.routine;
    this.rutinaDescArg = arg.event._def.extendedProps.routineDescription;
    this.estadoDeRutina = arg.event._def.extendedProps.estadoDeRutina;
    this.description = arg.event._def.extendedProps.descripcion;
    this.zoomLinkProps = arg.event._def.extendedProps.zoomLink;
    this.zoomPasswordProps = arg.event._def.extendedProps.zoomPassword;
    this.horarioArg = arg.event._def.extendedProps.horario;
    this.isHoliday = arg.event._def.extendedProps.holiday;
    this.rutinaSeleccionada = true;
  }



  mostrarCalendarioToggle(){
    this.mostrarClendario = !this.mostrarClendario;
  }

  panelPorGrupo(id:any){
    this.sharedService.setDashboardId(id);
    this.grupoSeleccionado = true;
  }

  volverAGrupos(){
    this.grupoSeleccionado = false;
  }

  updateStudentName(){
    const request = {
      firstName: this.tutor.name,
      lastName: this.tutor.lastName
    }
    const descriptionRequest = {
      profileDescription: this.tutor.description
    }
    this.tutorService.updateDescription(descriptionRequest)
    .subscribe(
      (success)=>{
        this.snackbar.open('Descripción actualizada',undefined,{
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
    this.tutorService.updateName(request)
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
      password: this.tutor.password,
      confirmedPassword: this.tutor.confirmedPassword,
      currentPassword: this.tutor.currentPassword
    }
    this.tutorService.updatePassword(request)
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

  logOut(){
    this.cookieService.delete('accessToken');
    this.ngOnInit();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CalendarOptions, render } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { GestionRutinasService } from 'src/app/services/rutinas/gestion-rutinas.service';
import { RutinasFechadasService } from 'src/app/services/Plantillas/rutinas-fechadas.service';

@Component({
  selector: 'sesiones-diarias',
  templateUrl: './sesiones-diarias.component.html',
  styleUrls: ['./sesiones-diarias.component.css']
})
export class SesionesDiariasComponent implements OnInit {
  // CALENDARIO INICIO
  public events: any = [];
    displayedColumns = ['rutina','fecha','edades','status'];

    calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      events: this.events,
      eventClick: this.handleDateClick.bind(this),
      locale: esLocale
    };
  // CALENDARIO FIN

  //TABLA INICIO 
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource!: MatTableDataSource<any>;
  //TABLA FIN

  //FORMULARIO INICIO
    @ViewChild('eventForm') eventForm?: NgForm;
    @ViewChild('eventUpdateForm') eventUpdateForm?: NgForm;
  //FORMULARIO FIN

  //Variables
  menuOption = 'uno';
  detailsCalendar = false;
  sessions: Array<any> = [];
  sessionsArray: Array<any> = [];
  updateSession: any;
  sessionDelete: string = '';
  evento: any = {
    date: '',
    routineId: '',
  }
  routines: Array<any> = [];
  mostrarClendario = false;

  title:any;
  description:any;
  status:any;
  form:any;
  employee:any;
  motivo:any;
  mostrar = false;

  empleadosFiltrados: Array<any> = [];
  empleadoSeleccionado = '';
  updateButton= false;
  meetingPassword = '';
  meetingUrl = '';

  constructor(
    private sharedService:SharedService,
    private routineService: GestionRutinasService,
    private snackbar: MatSnackBar,
    private rutinasService: RutinasFechadasService,
  ) {
    var date = new Date();
    var year = date.getFullYear();
    console.log(year)

    this.sharedService.getSessions()
    .subscribe(
      (success)=>{
        console.log("SESIONES",success)
        this.sessions = success;


        for (let i = 0; i < this.sessions.length; i++) {

          var date = new Date(this.sessions[i].date);

          this.events[i] = {
            title: success[i].routine.code,
            date: date.toISOString().split('T')[0],
            description: success[i].routine.description,
            meetingUrl: success[i].meetingUrl,
            meetingPassword: success[i].meetingPassword,
            color : '#4ACFC6'
          }
          console.log("evento de calendario",this.events[i])
        }


        for (let i = 0; i < this.sessions.length; i++) {
          this.sessionsArray.push(createNewUser(success[i]));
        }
        this.dataSource = new MatTableDataSource(this.sessionsArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      (error) =>{
        console.log(error);
      }
    );  
    //Dias festivos
    this.rutinasService.getHolidays()
    .subscribe(
      (success)=>{
        console.log("DIAS FESTIVOS",success)
        for (let index = 0; index < success.length; index++) {
          this.events[this.sessions.length+index] = {
            motivo: success[index].name,
            title: 'Festivo',
            date: success[index].date,
            description: '',
            meetingUrl: '',
            meetingPassword: '',
            color: '#a5b9c0',
          }
        }
      },(error)=>{
        console.log(error);
      }
    ) 
  }

  handleDateClick(arg:any){
    console.log("ARG", arg)
    this.detailsCalendar = true;
    this.title = arg.event._def.title;
    this.motivo = arg.event._def.extendedProps.motivo;
    this.description = arg.event.extendedProps.description;
    this.meetingUrl = arg.event.extendedProps.meetingUrl;
    this.meetingPassword = arg.event.extendedProps.meetingPassword;
  } 


  ngOnInit(): void {
  this.routineService.getRoutines()
    .subscribe(
      (success)=>{
        this.routines = success
      },(error)=>{
        console.log(error)
      }
    );
  }

  mostrarCalendarioToggle(){
    this.mostrarClendario = !this.mostrarClendario;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(){
    const eventRequest = {
      date: this.evento.date,
      routineId: this.evento.routineId,
    }

    this.sharedService.createSession(eventRequest)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Se creó el evento correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error creando el evento, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );    
  }

  /* updateEvent(){
    this.eventService.updateEvent(this.eventUpdate, this.updateEvento)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se actualizó el evento correctamente',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000);      
        },(error)=>{
        this.snackbar.open('Error actualizando el evento',undefined,{
          duration: 2000
        });
        console.log(error)
      }
    )
  } */

  eventToDelete(id:any){
    this.sessionDelete = id;
    console.log(id)
  }


  deleteEvent(){
    this.sharedService.deleteSession(this.sessionDelete)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se eliminó la sesión correctamente',undefined,{
          duration: 2000
        });
          var tiempos = setTimeout(()=>{
            window.location.reload();
          },2000);      
        },(error)=>{
        this.snackbar.open('Error eliminando la sesión',undefined,{
          duration: 2000
        });
        console.log(error)
      }
    )
  }

}

function createNewUser(todas: any): any {

  return {
    id: todas.id,
    date: todas.date,
    age: todas.routine.minAge.toString() +" - "+ todas.routine.maxAge.toString(),
    routine: todas.routine.code +" - "+ todas.routine.description,
  };
}



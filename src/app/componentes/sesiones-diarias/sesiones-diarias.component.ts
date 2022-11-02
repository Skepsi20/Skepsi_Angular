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

@Component({
  selector: 'sesiones-diarias',
  templateUrl: './sesiones-diarias.component.html',
  styleUrls: ['./sesiones-diarias.component.css']
})
export class SesionesDiariasComponent implements OnInit {
  // CALENDARIO INICIO
    public eventsCalendar: any = [];
    displayedColumns = ['rutina','fecha','edades','status'];

    calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      events: this.eventsCalendar,
      eventClick: this.handleDateClick.bind(this),
      locale: esLocale,
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


  title:any;
  description:any;
  status:any;
  form:any;
  employee:any;
  mostrar = false;

  empleadosFiltrados: Array<any> = [];
  empleadoSeleccionado = '';
  updateButton= false;


  constructor(
    private sharedService:SharedService,
    private routineService: GestionRutinasService,
    private snackbar: MatSnackBar,
  ) {
    var date = new Date();
    var year = date.getFullYear();
    console.log(year)

    this.sharedService.getSessions()
    .subscribe(
      (successResponse)=>{
        console.log("SESIONES",successResponse)
        this.sessions = successResponse;
        for (let i = 0; i < this.sessions.length; i++) {
          this.sessionsArray.push(createNewUser(successResponse[i]));
        }
        this.dataSource = new MatTableDataSource(this.sessionsArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      (error) =>{
        console.log(error);
      }
    );  
    
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
    /* this.eventService.getEvents()
    .subscribe(
      (success)=>{
        console.log('DATA',success)
        for (let i = 0; i < success.length; i++) {
          var statusColor = '';
          if(success[i].status == 'Pendiente'){
            statusColor = '#f97300'
          }else if(success[i].status == 'Completado'){
            statusColor = '#2c8100'
          }else if(success[i].status == 'Retrasado'){
            statusColor = 'red'
          }
          var inicio = new Date(success[i].startDateTime);
          var fin = new Date(success[i].endDateTime);

          var final = (fin.getFullYear()).toString() +'-'+ (fin.getUTCMonth() + 1).toString().padStart(2, '0') +'-'+ (fin.getUTCDate()+1)
    
          this.eventsCalendar[i] = {
            title: success[i].name,
            start: inicio.toISOString().split('T')[0],
            end: final,
            description: success[i].description,
            status: success[i].status,
            form: success[i].form.code + ' - ' + success[i].form.name,
            formId: success[i].form.id,
            employee: success[i].employee.firstName +' '+success[i].employee.lastName,
            color: statusColor,
          }
        }
      },(error)=>{
        console.log(error)
      }
    )
    this.employeesService.getEmployees()
    .subscribe(
      (success)=>{
        this.employees = success;
      },(error)=>{
        console.log(error);
      }
    )
    this.auditoriasService.getForm()
    .subscribe(
      (success)=>{
        this.forms = success
      },(error)=>{
        console.log(error);
      }
    ) */
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
      console.log("EL EVENTO",this.evento)

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

  handleDateClick(arg:any){
    this.detailsCalendar = true;

    this.title = arg.event._def.title;
    this.description = arg.event.extendedProps.description;
    this.status = arg.event.extendedProps.status;
    this.form = arg.event.extendedProps.form;
    this.employee = arg.event.extendedProps.employee;
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
  console.log("TODAS",todas)
  
  return {
    id: todas.id,
    date: todas.date,
    age: todas.routine.minAge.toString() +" - "+ todas.routine.maxAge.toString(),
    routine: todas.routine.code +" - "+ todas.routine.description,
  };
}



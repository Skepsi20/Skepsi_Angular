import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { zoomData } from 'src/app/Models/Tutores/dashboard';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';

@Component({
  selector: 'app-tutores-dashboard-admin',
  templateUrl: './tutores-dashboard-admin.component.html',
  styleUrls: ['./tutores-dashboard-admin.component.css']
})
export class TutoresDashboardAdminComponent implements OnInit {
  public tutorId:any;
  public tutores:any = [];
  public grupos:any = [];
  public dashboardDetail: any;
  public tutorSelected = false;
  public groupSelected = false;
  public groupId: string = '';
  public studentToSuspend: string = '';
  comentariosDeSuspension: string = '';

  zoomData: zoomData = {
    meetingUrl: '',
    meetingPassword: ''
  }
  meetingPassword: string = '';
  meetingUrl: string = '';

  constructor(
    private tutorService: TutorService,
    private sharedService: SharedService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tutorService.getTutores()
    .subscribe(
      (success)=>{
        this.tutores = success;
      },(error)=>{
        console.log(error);
      }
    )
  }

  selectedTutor(tutorId:any){
    this.tutorSelected = true;
    this.tutorService.getGruposDeTutores(tutorId)
    .subscribe(
      (success)=>{
        this.grupos = success;
      },(error)=>{
        console.log(error)
      }
    )
  }

  selectedGroup(id:string){
    this.groupId = id;
    this.groupSelected = true;
    this.tutorService.getDashboardDetails(id)
    .subscribe(
      (success)=>{
        this.dashboardDetail = success;
        console.log("ALUMNOS",this.dashboardDetail)
      },(error)=>{
        console.log(error)
      }
    )
    this.sharedService.getgroup(this.groupId)
      .subscribe(
        (success)=>{
          this.meetingUrl = success.meetingUrl;
          this.meetingPassword = success.meetingPassword;
        },(error)=>{
          console.log(error)
        }
      )
  }

  iniciarRutina(){
    console.log(this.dashboardDetail.id)
    this.sharedService.changeRoutineStatus(this.dashboardDetail.session.id,"InProgress")
    .subscribe(
      (success)=>{
        this.snackbar.open('Rutina iniciada.',undefined,{
          duration: 2000
        });
        window.location.reload();
      },(error)=>{
        console.log(error)
      }
    )
  }

  detenerRutina(){
    this.sharedService.changeRoutineStatus(this.dashboardDetail.session.id,"Finished")
    .subscribe(
      (success)=>{
        this.snackbar.open('Rutina detenida.',undefined,{
          duration: 2000
        });
        window.location.reload();
      },(error)=>{
        console.log(error)
      }
    )
  }

  addZoom(){
    const data = {
      meetingUrl : this.zoomData.meetingUrl,
      meetingPassword : this.zoomData.meetingPassword,
    }
    this.tutorService.createZoomLink(this.groupId,data)
      .subscribe(
        (success)=>{
          this.snackbar.open('Liga actualizada.',undefined,{
            duration: 2000
          });
          window.location.reload();
        },(error)=>{
          console.log(error)
        }
      )
  }

  suspender(id:string){
    this.studentToSuspend = id;
  }


  deleteConfirmation(){
    const request = {
      id: this.studentToSuspend,
      comments: this.comentariosDeSuspension
    }
    this.tutorService.suspendStudent(request)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Alumno suspendido con éxito',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error suspendiendo al alumno, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

}

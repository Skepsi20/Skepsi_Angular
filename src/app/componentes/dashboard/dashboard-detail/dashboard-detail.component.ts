import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { NgForm } from '@angular/forms';
import { zoomData } from 'src/app/Models/Tutores/dashboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {
  public id : string = '';
  public dashboardDetail : any = {
    code: '',
    id: '',
    plan: {},
    students:[{}],
    tutor:{}
  };
  zoomData: zoomData = {
    meetingUrl: '',
    meetingPassword: ''
  }
  groupId: string ='';
  sessionId: string ='';
  meetingPassword: string = '';
  meetingUrl: string = '';
  studentToSuspend: string = '';
  comentariosDeSuspension: string = '';
  tutorId = '';

  @ViewChild('zoomForm') zoomForm?: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private readonly sharedService: SharedService,
    private readonly tutorService: TutorService
  ) {  }


  ngOnInit(): void {
    this.getData();
    setInterval(()=> {
      this.getData()
    }
    ,20000);
  }

  getData(){
    if(this.sharedService.getDashboardId()){
      this.tutorService.getDashboardDetails(this.sharedService.getDashboardId())
      .subscribe(
        (success)=>{
          console.log("DASHBOARD DETAIL", success)
          this.groupId = success.id
          this.dashboardDetail = success;
          this.tutorId = this.dashboardDetail.tutor.id;
          this.sharedService.getgroup(this.groupId)
            .subscribe(
              (success)=>{
                this.meetingUrl = success.meetingUrl;
                this.meetingPassword = success.meetingPassword;
              },(error)=>{
                console.log(error)
              }
            )
        },(error)=>{
          console.log(error)
        }
      )
    }else{
      this.router.navigateByUrl('/dashboard')
    }
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
          this.ngOnInit();
        },(error)=>{
          console.log(error)
        }
      )
  }

  iniciarRutina(){
    this.sharedService.changeRoutineStatus(this.groupId,true)
    .subscribe(
      (success)=>{
        this.snackbar.open('Rutina iniciada.',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },(error)=>{
        console.log(error)
      }
    )
  }

  detenerRutina(){
    this.sharedService.changeRoutineStatus(this.groupId,false)
    .subscribe(
      (success)=>{
        this.snackbar.open('Rutina detenida.',undefined,{
          duration: 2000
        });
        this.ngOnInit();
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

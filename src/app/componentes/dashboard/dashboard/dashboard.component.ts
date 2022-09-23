import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  grupos: Array<any> = [];
  nombreTutor: string = '';
  constructor(
    private readonly tutorService: TutorService,
    private readonly router: Router,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.tutorService.getDashboardGroups()
    .subscribe(
      (success)=>{
        console.log("GRUPOS POR MAESTRO",success)
        this.grupos = success;
        this.nombreTutor = this.grupos[0].tutor.firstName +' '+this.grupos[0].tutor.lastName;
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
  }

  detalles(id:any){
    this.sharedService.setDashboardId(id);
    this.router.navigate(['dashboard-detalles']);
  }
}

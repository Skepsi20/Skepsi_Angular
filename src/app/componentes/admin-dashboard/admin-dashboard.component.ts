import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { VentasService } from 'src/app/services/Planes/ventas.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public planes: Array<any> = [];
  public grupos: Array<any> = [];
  public results: Array<any> = [];
  public showPlans: boolean = true;
  public showGroups: boolean = false;
  public showResults: boolean = false;

  constructor(
    private plansService: VentasService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.plansService.getAllPaquetes()
    .subscribe(
      (success)=>{
        this.planes = success;
      },(error)=>{
        console.log(error)
      }
    )
  }

  selectedPlan(plan:string){
    this.sharedService.getAllgrupos(plan)
    .subscribe(
      (success)=>{
        this.showPlans = false;
        this.showGroups = true;
        this.grupos = success;
        console.log("Grupos por plan",success);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  studentResults(id:string){
    this.sharedService.getAllStudentSessions(id)
    .subscribe(
      (success)=>{
        this.showPlans = false;
        this.showGroups = false;
        this.showResults = true;
        this.results = success;
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }
}

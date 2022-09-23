import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iroutine } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';

@Component({
  selector: 'app-resultados-filtro',
  templateUrl: './resultados-filtro.component.html',
  styleUrls: ['./resultados-filtro.component.css']
})
export class ResultadosFiltroComponent implements OnInit {
  public routines : Iroutine[] = [];
  routine: any = {
    id: ''
  }
  public routineReady = false;
  public toggleVar : boolean = false;

  @ViewChild('routineForm') institutionForm?: NgForm;

  constructor(
    private readonly resultsService: ResultsService,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.resultsService.getRoutinesWithResults()
    .subscribe(
      (success)=>{
        this.routines = success;
      },(error)=>{
        console.log(error)
      }
    )
  }

  selectedRoutine(){
    if(this.routineReady == true){
      let currentUrl = this._router.url;
      this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this._router.navigate([currentUrl]);
      });
    }else if(this.routineReady == false && this.routine.id){
      this.routineReady = true
    }
  }/*
  refresh(){
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  } */
}

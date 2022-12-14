import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { ITutor } from 'src/app/Models/api-models/tutores.model';

@Component({
  selector: 'app-grupo-detalles',
  templateUrl: './grupo-detalles.component.html',
  styleUrls: ['./grupo-detalles.component.css']
})

export class GrupoDetallesComponent implements OnInit {
  public grupo: string = '';
  public group: any;
  public gruposShared: any;
  public studentId: string = '';
  public groupId: string = '';
  public plan: string = '';
  public cambioDeGrupo = {
    student: '',
    group: ''
  }
  public cambioDeTutor = {
    tutor: '',
    group: ''
  }
  public allTutors: ITutor[] = [];
  public instituciones: any;
  public todosLosGrupos: any;
  public institucionesDisponibles: Array<any> = [];

  @ViewChild('groupsForm') groupsForm?: NgForm;
  @ViewChild('tutorsForm') tutorsForm?: NgForm;

  constructor(
    private tutorService: TutorService,
    private shared: SharedService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.grupo = this.shared.getGrupo();
    this.plan = this.shared.getPlan();
    console.log(this.grupo);
    if(this.grupo == ''){
      this.router.navigateByUrl(`/planes`)
    }
    this.getAll();
  }

  getAll(){
    this.shared.getgroup(this.grupo)
      .subscribe(
        (successResponse)=>{
          this.group = successResponse;
          this.instituciones = this.group.institutions;
          console.log("GRUPOOOOO",this.group)
          this.shared.getAllgrupos(this.plan)
            .subscribe(
              (successResponse)=>{
                this.todosLosGrupos = successResponse;
                this.gruposShared = successResponse.filter(g => g.id != this.grupo);
                this.tutorService.getTutores()
                .subscribe(
                  (successResponse)=>{
                    this.allTutors = successResponse.filter(t => t.id != this.group.tutor.id);
                  },
                  (error) =>{
                    console.log(error);
                  }
                );
              },
              (error) =>{
                console.log(error);
              }
          );
        },
        (error) =>{
          console.log(error);
        }
    );
  }
  
  verificarCambio(event:any){
    this.institucionesDisponibles = [];
    let institucionAlumno: any; 
    institucionAlumno = event.value.institution.id;
    for (let i = 0; i < this.todosLosGrupos.length; i++) {
      for (let j = 0; j < this.todosLosGrupos[i].institutions.length; j++) {
        if(this.todosLosGrupos[i].institutions[j].id == institucionAlumno && this.todosLosGrupos[i].id != this.group.id){
          this.institucionesDisponibles.push(this.todosLosGrupos[i])
        }        
      }
    }
  }

  cambiarGrupo(){
    if(this.groupsForm?.form.valid && this.cambioDeGrupo.student != '' && this.cambioDeGrupo.group != ''){
      console.log("Cambio de grupo",this.cambioDeGrupo)
      this.shared.cambiarGrupo(this.cambioDeGrupo)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se cambi?? al estudiante correctamente',undefined,{
            duration: 2000
          });
          this.ngOnInit();
          this.institucionesDisponibles = [];
          this.getAll();
        },
        (error) =>{
          this.snackbar.open('Error cambiando al estudiante de plan, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  cambiarTutor(){
    this.cambioDeTutor.group = this.grupo;
    if(this.tutorsForm?.form.valid && this.cambioDeTutor.tutor != '' && this.cambioDeTutor.group != ''){
      this.shared.cambiarTutor(this.cambioDeTutor)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se cambi?? el tutor correctamente',undefined,{
            duration: 2000
          });
          console.log(successResponse);
          this.getAll();
        },
        (error) =>{
          this.snackbar.open('Error cambiando al tutor, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

}

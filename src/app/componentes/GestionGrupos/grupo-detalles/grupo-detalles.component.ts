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
    this.shared.getgrupo(this.grupo)
      .subscribe(
        (successResponse)=>{
          this.group = successResponse;
          this.shared.getAllgrupos(this.plan)
            .subscribe(
              (successResponse)=>{
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

  cambiarGrupo(){
    if(this.groupsForm?.form.valid && this.cambioDeGrupo.student != '' && this.cambioDeGrupo.group != ''){
      this.shared.cambiarGrupo(this.cambioDeGrupo)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se cambió al estudiante correctamente',undefined,{
            duration: 2000
          });
          console.log(successResponse);
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
          this.snackbar.open('Se cambió el tutor correctamente',undefined,{
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

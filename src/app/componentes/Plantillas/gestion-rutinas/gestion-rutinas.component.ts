import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { rutina } from 'src/app/Models/api-models/rutina.model';
import { GestionRutinasService } from 'src/app/services/rutinas/gestion-rutinas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-rutinas',
  templateUrl: './gestion-rutinas.component.html',
  styleUrls: ['./gestion-rutinas.component.css']
})
export class GestionRutinasComponent implements OnInit, AfterViewInit{

  displayedColumns = ['name', 'ages', 'code','id'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild('routineForm') routineForm?: NgForm;

  public routine: rutina = {
    id: '',
    code: '',
    name: '',
    description: '',
    pillarType: '',
    trainingPlanType: '',
    cognitiveDevelopmentLevel: '',
    minAge: 0,
    maxAge: 0
  };
  public allRoutines: rutina[] = [];
  public routineToDelete: string = '';
  public hashira = ['Desarrollo cognitivo (Gnostiki)','Emociones y afectos (Synaisthimata)','Lenguaje y comunicación (Glossa)','Lógico Matemático (Mathimatiki)'];
  public planesDeEntrenamiento = ['Fuerza (Dynami)','Resistencia (Antochi)','Potencia (Exousia)'];
  public nivelesDeDesarrollo = ['Recuperación','Comprensión','Análisis','Utilización del conocimiento','Metacognitivo','Self'];
  public users: rutina[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private readonly gestionRutinasService: GestionRutinasService,
  ) {
    this.gestionRutinasService.getRoutines()
    .subscribe(
      (successResponse)=>{
        this.allRoutines = successResponse;
        for (let i = 0; i < this.allRoutines.length; i++) {
          this.users.push(createNewUser(successResponse[i]));
        }
        console.log('Todas las rutinas',this.users)
      },
      (error) =>{
        this.snackbar.open('Error, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  ngOnInit(): void {
  }


  createRoutine(){
    if(this.routineForm?.form.valid){
      this.gestionRutinasService.addRoutine(this.routine)
      .subscribe(
        (sucessResponse)=>{
          this.snackbar.open('Rutina agregada con éxito',undefined,{
            duration: 2000
          });
          window.location.reload();
        },
        (error) =>{
          this.snackbar.open('Error agregando la rutina, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  deleteRoutine(routine: string){
    this.routineToDelete = routine;
  }

  deleteConfirmation(){
    this.gestionRutinasService.deleteRoutine(this.routineToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Rutina eliminada con éxito',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error eliminando la rutina, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

}


function createNewUser(todas: any): any {
  const ages = todas.minAge +' - '+todas.maxAge;

  return {
    id : todas.id,
    name: todas.name,
    code: todas.code,
    description: todas.description,
    ages: ages,
    pillarType: todas.pillarType,
    cognitiveDevelopmentLevel: todas.cognitiveDevelopmentLevel,
    trainingPlanType: todas.trainingPlanType
  };
}


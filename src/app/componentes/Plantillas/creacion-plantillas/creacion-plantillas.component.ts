import { Component, ViewChild, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { rutina, templateCreate,template } from 'src/app/Models/api-models/rutina.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionRutinasService } from 'src/app/services/rutinas/gestion-rutinas.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { Router } from '@angular/router';
import { DynamicComponentDirective } from '../../rutinas/dynamic-component.directive';
import { DetallesPlantillaComponent } from '../../Plantillas/detalles-plantilla/detalles-plantilla.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-creacion-plantillas',
  templateUrl: './creacion-plantillas.component.html',
  styleUrls: ['./creacion-plantillas.component.css']
})
export class CreacionPlantillasComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponent!: DynamicComponentDirective;
  public allRoutines: rutina[] = [];
  public todo:any = [];
  public done:any = [];
  public templateToDelete: string = '';
  detallesParaMostrar = false;
  rutinasDePlantilla: Array<any> = [];
  displayedColumns = ['name','description','editar','eliminar'];
  role = '';
  roles = ['Desarrollo','Emociones','Lenguaje','Matematico'];
  arregloRutinas: Array<any> = [];
  dataSource: MatTableDataSource<any>;
  plantillas : Array<any> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  public createTemplateDom: templateCreate = {
    id: '',
    name: '',
    routines: [],
    description: ''
  }
  public todasPlantillas: Array<templateCreate> = [];

  @ViewChild('templateForm') templateForm?: NgForm;

  constructor(
    private snackbar: MatSnackBar,
    private readonly gestionRutinasService: GestionRutinasService,
    private readonly sharedService: SharedService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
  ) {
    this.gestionRutinasService.getTemplates()
    .subscribe(
      (successResponse)=>{
        this.todasPlantillas = successResponse;
        for (let i = 0; i < this.todasPlantillas.length; i++) {
          this.plantillas.push(createNewUser(successResponse[i]));
        }
      },
      (error) =>{
        this.snackbar.open('Error, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
    this.dataSource = new MatTableDataSource(this.plantillas);
  }

  ngOnInit(): void {
    this.gestionRutinasService.getRoutines()
    .subscribe(
      (successResponse)=>{
        this.todo = successResponse;
        console.log('Todas las rutinas', this.todo)
      },
      (error) =>{
        this.snackbar.open('Error, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
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

  selectedRoutineType(){
    this.arregloRutinas = [];
    console.log(this.role)
    switch(this.role){
      case 'Desarrollo' : {
        for (let index = 0; index < this.todo.length; index++) {
          if(this.todo[index].pillarType == 1){
            this.arregloRutinas.push(this.todo[index]);
          }
        }
        break;
      }
      case 'Emociones' : {
        for (let index = 0; index < this.todo.length; index++) {
          if(this.todo[index].pillarType == 2){
            this.arregloRutinas.push(this.todo[index]);
          }
        }
        break;
      }
      case 'Lenguaje' : {
        for (let index = 0; index < this.todo.length; index++) {
          if(this.todo[index].pillarType == 3){
            this.arregloRutinas.push(this.todo[index]);
          }
        }
        break;
      }
      case 'Matematico' : {
        for (let index = 0; index < this.todo.length; index++) {
          if(this.todo[index].pillarType == 4){
            this.arregloRutinas.push(this.todo[index]);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  createTemplate(){
    for(let i=0; i<this.rutinasDePlantilla.length ; i++){
      this.createTemplateDom.routines[i] = this.rutinasDePlantilla[i].id;
    }
    if(this.templateForm?.form.valid){
      this.gestionRutinasService.addTemplate(this.createTemplateDom)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se creó la plantilla correctamente',undefined,{
            duration: 2000
          });
          window.location.reload();
        },
        (error) =>{
          this.snackbar.open('Error creando la plantilla, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  crearRutina(){
    const component = this.componentFactoryResolver.resolveComponentFactory(DetallesPlantillaComponent);
    this.dynamicComponent.viewContainerRef.clear();
    this.dynamicComponent.viewContainerRef.createComponent(component);
  }

  destruirRutina(){
    this.dynamicComponent.viewContainerRef.clear();
    this.router.navigateByUrl(`/administrador`)
  }

  detallesPlantilla(idPlantilla: string){
    this.sharedService.setDetallesPlantilla(idPlantilla);
    this.detallesParaMostrar = true;
    this.destruirRutina();
    this.crearRutina();
  }

  deleteTemplate(routine: string){
    this.templateToDelete = routine;
  }

  deleteConfirmation(){
    this.gestionRutinasService.deleteTemplate(this.templateToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Rutina eliminada con éxito',undefined,{
          duration: 2000
        });
        this.ngOnInit();
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
  return {
    id: todas.id,
    name: todas.name,
    description : todas.description,
  };
}

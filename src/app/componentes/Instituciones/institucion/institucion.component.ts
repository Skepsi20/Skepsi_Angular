import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';
import { InstitucionService } from 'src/app/services/Instituciones/institucion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit, AfterViewInit {
  institution: IInstitution = {
    id: '',
    name: '',
    shortName: ''
  }
  displayedColumns = ['shortName','name','editar','eliminar'];
  public instituciones: Array<any> = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public institucionDOM : Array<IInstitution> = [];
  public institutionToDelete: string = '';
  institutionToUpdate: IInstitution = {
    id:'',
    name: '',
    shortName:''
  };

  @ViewChild('institutionForm') institutionForm?: NgForm;
  @ViewChild('institutionUpdate') institutionUpdate?: NgForm;

  constructor(
    private readonly institutionService: InstitucionService,
    private snackbar: MatSnackBar,
    private router: Router,
    ) {
      this.institutionService.getAll()
      .subscribe(
        (successResponse)=>{
          this.institucionDOM = successResponse;
          for (let i = 0; i < this.institucionDOM.length; i++) {
            this.instituciones.push(createNewUser(successResponse[i]));
          }
        },
        (error) =>{
          console.log(error);
        }
      );
      this.dataSource = new MatTableDataSource(this.instituciones);
    }

  ngOnInit(): void {
    this.getAll();
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

  getAll(){
    this.institutionService.getAll()
      .subscribe(
        (successResponse)=>{
          this.institucionDOM = successResponse;
        },
        (error) =>{
          console.log(error);
        }
    );
  }

  add(){
    if(this.institutionForm?.form.valid){
      this.institutionService.add(this.institution)
      .subscribe(
        (successResponse)=>{
          this.snackbar.open('Se creó la institución correctamente',undefined,{
            duration: 2000
          });
          window.location.reload();
        },
        (error) =>{
          this.snackbar.open('Error creando institución, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  delete(id: string){
    this.institutionToDelete = id;
  }

  deleteConfirmation(){
    this.institutionService.delete(this.institutionToDelete)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Se eliminó la institución correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error eliminando institución, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

  update(id: string, name: string, shortName:string){
    this.institutionToUpdate.id = id;
    this.institutionToUpdate.name = name;
    this.institutionToUpdate.shortName = shortName;
  }

  updateConfirm(){
  this.institutionService.update(this.institutionToUpdate.id,this.institutionToUpdate)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Se actualizó la institución correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error actualizando institución, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }
}



function createNewUser(todas: any): any {

  return {
    id: todas.id,
    shortName: todas.shortName,
    name : todas.name,
  };
}

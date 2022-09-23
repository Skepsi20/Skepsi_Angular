import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-suspendidos',
  templateUrl: './suspendidos.component.html',
  styleUrls: ['./suspendidos.component.css']
})
export class SuspendidosComponent implements OnInit, AfterViewInit{
  status = '';
  statuses = ['Activo','Suspendido','Inactivo'];
  displayedColumns = ['name','institution','grupo','date','dateModify','status'];
  alumnos:any = [];
  studentToReactivate = '';
  studentToCancel = '';
  dataSource: MatTableDataSource<any>;
  alumnosArray: Array<any> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private tutorService: TutorService,
    private snackbar: MatSnackBar,
    private readonly spinnerService: SpinnerService
  ) {
    this.tutorService.getSuspendedStudents('Activo')
      .subscribe(
        (success)=>{
          this.spinnerService.hide();
          this.alumnos = success;
          for (let i = 0; i < this.alumnos.length; i++) {
            this.alumnosArray.push(createNewUser(success[i]));
          }
          console.log(success)
        },(error)=>{
          this.spinnerService.hide();
          console.log(error)
        }
      )
      this.dataSource = new MatTableDataSource(this.alumnosArray);
  }

  ngOnInit(): void {
    if(this.status != ''){
      this.spinnerService.show();
      this.tutorService.getSuspendedStudents(this.status)
      .subscribe(
        (success)=>{
          this.spinnerService.hide();
          this.alumnos = success;
          console.log(success)
        },(error)=>{
          this.spinnerService.hide();
          console.log(error)
        }
      )
    }
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

  reactivar(id:string){
    this.studentToReactivate = id;
  }

  desactivar(id:string){
    this.studentToCancel = id;
  }

  confirmarReactivar(){
    this.tutorService.unsuspendStudent(this.studentToReactivate)
    .subscribe(
      (success)=>{
        window.location.reload();
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

  confirmarDesactivar(){
    this.tutorService.cancelStudent(this.studentToCancel)
    .subscribe(
      (success)=>{
        window.location.reload();
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

}


function createNewUser(todas: any): any {
  console.log("FECHA DE ACTUALIZACION",todas)
  return {
    id: todas.id,
    name: todas.firstName +' '+ todas.lastName,
    institution : todas.institution.shortName,
    groupName: todas.groupName,
    date: todas.registrationDate,
    dateModify: todas.statusUpdateDatetime,
  };
}

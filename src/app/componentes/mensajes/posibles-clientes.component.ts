import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SkepsiService } from 'src/app/services/skepsi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posibles-clientes',
  templateUrl: './posibles-clientes.component.html',
  styleUrls: ['./posibles-clientes.component.css']
})
export class PosiblesClientesComponent implements OnInit, AfterViewInit {
  messageToDelete:any;
  role = '';
  roles = ['Chatbot','Contactanos','Entrenador','Gimnasio','Ventas'];
  displayedColumns = ['name','phone','email','comments','status','enProceso','eliminar'];
  dataSourceCH: MatTableDataSource<any>;
  dataSourceCO: MatTableDataSource<any>;
  dataSourceTU: MatTableDataSource<any>;
  dataSourceVE: MatTableDataSource<any>;
  dataSourceGI: MatTableDataSource<any>;
  mensajesCH: Array<any> = [];
  mensajesCO: Array<any> = [];
  mensajesTU: Array<any> = [];
  mensajesVE: Array<any> = [];
  mensajesGI: Array<any> = [];
  actualizarMensaje = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackbar: MatSnackBar,
    private skepsiService: SkepsiService,
    private readonly spinnerService: SpinnerService
  ) {

    this.skepsiService.getMessages('Chatbot')
    .subscribe(
      (success)=>{
        console.log(success)
        this.spinnerService.hide();
        for (let i = 0; i <success.length; i++) {
          this.mensajesCH.push(createNewUser(success[i]));
        }
      },(error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )
    this.skepsiService.getMessages('Contactanos')
    .subscribe(
      (success)=>{
        console.log(success)
        this.spinnerService.hide();
        for (let i = 0; i <success.length; i++) {
          this.mensajesCO.push(createNewUser(success[i]));
        }
      },(error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )
    this.skepsiService.getMessages('Entrenador')
    .subscribe(
      (success)=>{
        console.log(success)
        this.spinnerService.hide();
        for (let i = 0; i <success.length; i++) {
          this.mensajesTU.push(createNewUser(success[i]));
        }
      },(error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )
    this.skepsiService.getMessages('Ventas')
    .subscribe(
      (success)=>{
        console.log(success)
        this.spinnerService.hide();
        for (let i = 0; i <success.length; i++) {
          this.mensajesVE.push(createNewUser(success[i]));
        }
      },(error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )
    this.skepsiService.getMessages('Gimnasio')
    .subscribe(
      (success)=>{
        console.log(success)
        this.spinnerService.hide();
        for (let i = 0; i <success.length; i++) {
          this.mensajesGI.push(createNewUser(success[i]));
        }
      },(error)=>{
        this.spinnerService.hide();
        console.log(error)
      }
    )

    this.dataSourceCH = new MatTableDataSource(this.mensajesCH);
    this.dataSourceCO = new MatTableDataSource(this.mensajesCO);
    this.dataSourceTU = new MatTableDataSource(this.mensajesTU);
    this.dataSourceVE = new MatTableDataSource(this.mensajesVE);
    this.dataSourceGI = new MatTableDataSource(this.mensajesGI);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSourceCH.paginator = this.paginator;
    this.dataSourceCH.sort = this.sort;
    this.dataSourceCO.paginator = this.paginator;
    this.dataSourceCO.sort = this.sort;
    this.dataSourceTU.paginator = this.paginator;
    this.dataSourceTU.sort = this.sort;
    this.dataSourceVE.paginator = this.paginator;
    this.dataSourceVE.sort = this.sort;
    this.dataSourceGI.paginator = this.paginator;
    this.dataSourceGI.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCH.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceCH.paginator) {
      this.dataSourceCH.paginator.firstPage();
    }
    this.dataSourceCO.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceCO.paginator) {
      this.dataSourceCO.paginator.firstPage();
    }
    this.dataSourceTU.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTU.paginator) {
      this.dataSourceTU.paginator.firstPage();
    }
    this.dataSourceVE.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceVE.paginator) {
      this.dataSourceVE.paginator.firstPage();
    }
    this.dataSourceGI.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceGI.paginator) {
      this.dataSourceGI.paginator.firstPage();
    }
  }


  deleteConfirmation(){
    this.skepsiService.deleteMessage(this.messageToDelete)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se eliminó el mensaje correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
      },(error)=>{
        this.snackbar.open('Error eliminando mensaje',undefined,{
          duration: 2000
        });
      }
    )
  }

  updateMessage(elemento:any, estado:string){
    this.actualizarMensaje = {
      id: elemento.id,
      name: elemento.name,
      phoneNumber: elemento.phone,
      email: elemento.email,
      comments: elemento.comments,
      sourceArea: elemento.sourceArea,
      status : estado
    }
  }

  updateConfirm(){
    this.skepsiService.updateMessage(this.actualizarMensaje)
    .subscribe(
      (success)=>{
        this.snackbar.open('Se cambió el estado del mensaje correctamente',undefined,{
          duration: 2000
        });
        window.location.reload();
        console.log(success);
      },(error)=>{
        console.log(error);
      }
    )
  }

  deleteMessage(id:any){
    this.messageToDelete = id;
  }

}


function createNewUser(todas: any): any {
  var estado = '';
  if(todas.status == 'EnProceso'){
    estado = 'En proceso'
  }else if(todas.status == 'Resuelto'){
    estado = 'Resuelto'
  }else if(todas.status == 'Pendiente'){
    estado = 'Pendiente'
  }

  return {
    id: todas.id,
    name: todas.name,
    phone : todas.phoneNumber,
    email : todas.email,
    comments: todas.comments,
    status: estado,
    sourceArea: todas.sourceArea
  };
}

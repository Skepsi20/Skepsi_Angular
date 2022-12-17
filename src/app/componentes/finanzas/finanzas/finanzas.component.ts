import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css'],
  providers: [DatePipe]
})
export class FinanzasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['concepto','sinIva','iva','conIva','estado','fecha','alumno'];
  dataSource = new MatTableDataSource<any> ();
  public ventas: Array<any> = [];
  public ventasDOM : Array<any> = [];
  motivoSelected: string = '';
  estadoSelected: string = '';
  startDate: any; 
  endDate: any;
  warning = false;
  filtrado = false;
  motivos = ['Todos','Inscripcion','Mensualidad']
  estados = ['Todos','Completado','Pendiente','Error']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private paypalService: PaypalService,
    private snackbar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
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

  buscarVentas(){
    this.ventas = [];
    if(!this.motivoSelected || !this.estadoSelected || !this.startDate || !this.endDate){
      this.warning = true;
    }else{
      this.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
      const request = {
        startDate: this.startDate,
        endDate: this.endDate,
        status: this.estadoSelected,
        description: this.motivoSelected
      }      
      console.log(request)
      this.paypalService.getFilteredSells(request).
      subscribe(
        (success)=>{
          for (let i = 0; i < success.length; i++) {
            for (let j = 0; j < success[i].receipts.length; j++) {
              for (let k = 0; k < success[i].receipts[j].transactions.length; k++) {
                this.ventas.push(createNewUser(success[i].receipts[j].transactions[k]));
              }
            }
          }
          this.dataSource = new MatTableDataSource(this.ventas);
        },(error)=>{
          console.log(error);
        }
      )
      this.filtrado = true;
      this.warning = false;
    }
  }
}


function createNewUser(todas: any): any {
  const sinIva = todas.netAmount
  var iva = todas.feeAmount
  const conIva = todas.grossAmount

  return {
    concepto: todas.description,
    sinIva: sinIva,
    iva: iva,
    conIva: conIva,
    estado: todas.status,
    fecha: todas.transactionDateTime,
    alumno:'alumno',
  };
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent implements OnInit, AfterViewInit {
  displayedColumns = ['concepto','sinIva','iva','conIva','estado','fecha','alumno'];
  dataSource: MatTableDataSource<any>;
  public ventas: Array<any> = [];
  public ventasDOM : Array<any> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private paypalService: PaypalService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.paypalService.getAllSales()
    .subscribe(
      (successResponse)=>{
        this.ventasDOM = successResponse;
        console.log(this.ventasDOM,"las ventas dom")
        console.log(this.ventasDOM[0].receipts[0].transactions,"las ventas que quiero")

        for (let i = 0; i < this.ventasDOM.length; i++) {
          for (let j = 0; j < this.ventasDOM[i].receipts[i].transactions.length; j++) {
            this.ventas.push(createNewUser(successResponse[i].receipts[i].transactions[j]));

          }
        }
      },
      (error) =>{
        console.log(error);
      }
    );
    this.dataSource = new MatTableDataSource(this.ventas);
  }

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

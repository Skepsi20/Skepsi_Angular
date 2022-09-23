import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { holiday } from 'src/app/Models/api-models/rutinasFechadas/holiday.model';
import { RutinasFechadasService } from 'src/app/services/Plantillas/rutinas-fechadas.service';
import { DatePipe } from '@angular/common';
import localePy from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy, 'es');

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  @ViewChild('holidayForm') holidayForm?: NgForm;

  public holidays: holiday = {
    id: '',
    name: '',
    date: ''
  }
  public holidayToDelete: string = '';
  public allHolidays: holiday[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private readonly rutinasFechadasService: RutinasFechadasService,
  ) { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.rutinasFechadasService.getHolidays()
    .subscribe(
      (successResponse)=>{
        this.allHolidays = successResponse;
        console.log(this.allHolidays)
      },
      (error) =>{
        this.snackbar.open('Error, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

  createHoliday(){
    if(this.holidayForm?.form.valid){
      this.rutinasFechadasService.addHoliday(this.holidays)
      .subscribe(
        (sucessResponse)=>{
          this.snackbar.open('Rutina agregada con éxito',undefined,{
            duration: 2000
          });
          this.inicializar();
        },
        (error) =>{
          this.snackbar.open('Error agregando la rutina, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }

  deleteRoutine(holiday: string){
    this.holidayToDelete = holiday;
  }

  deleteConfirmation(){
    this.rutinasFechadasService.deleteHoliday(this.holidayToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Dia festivo eliminada con éxito',undefined,{
          duration: 2000
        });
        this.inicializar();
      },
      (error) =>{
        this.snackbar.open('Error eliminando la rutina, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

}

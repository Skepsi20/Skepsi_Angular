import { Component, OnInit } from '@angular/core';
import { GestionRutinasService } from 'src/app/services/rutinas/gestion-rutinas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { rutina, templateCreate,template } from 'src/app/Models/api-models/rutina.model';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-plantilla',
  templateUrl: './detalles-plantilla.component.html',
  styleUrls: ['./detalles-plantilla.component.css']
})
export class DetallesPlantillaComponent implements OnInit {
  public todasPlantillas: template = {
    id: '',
    name: '',
    routines: [{
      id: '',
      maxAge: 0,
      minAge: 0,
      name: '',
      routineType: 0,
      sequence: 0
    }],
    description: ''
  };
  public idDetallePlantilla: string = '';

  constructor(
    private snackbar: MatSnackBar,
    private readonly gestionRutinasService: GestionRutinasService,
    private readonly sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.idDetallePlantilla = this.sharedService.getDetallesPlantilla();
    if(this.idDetallePlantilla == ''){
      this.router.navigateByUrl(`/creacion-plantillas`)
    }else{
      this.gestionRutinasService.getTemplate(this.idDetallePlantilla)
      .subscribe(
        (successResponse)=>{
          this.todasPlantillas = successResponse;
          for(let i=0; i<2; i++){
            console.log(this.todasPlantillas.routines[i])
          }
        },
        (error) =>{
          this.snackbar.open('Error, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }
}

import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { paquete } from '../../../Models/api-models/Plans/paquete.model';
import { VentasService } from '../../../services/Planes/ventas.service';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicComponentDirective } from '../../rutinas/dynamic-component.directive';
import { ListaDeGruposComponent } from '../lista-de-grupos/lista-de-grupos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponent!: DynamicComponentDirective;
  public paquetes : Array<paquete> = [];
  public paqueteShared : string = '';
  planToDelete : string = '';
  public grupoSeleccionado = false;
  planWithNoGroups : Array<boolean> = [];

  constructor(
    private readonly _ventasService: VentasService,
    private shared: SharedService,
    private snackbar: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grupoSeleccionado = false;
    this.getAll();
  }

  getAll(){
    this._ventasService.getAllPaquetes()
      .subscribe(
        (successResponse)=>{
          this.paquetes = successResponse;

          this.paquetes.forEach((plan:any) => {
            if(plan.hasGroups == false){
              this.planWithNoGroups.push(false);
            }else{
              this.planWithNoGroups.push(true);
            }
          });

          console.log("LOS PAQUETES",this.paquetes)
        },
        (error) =>{
          console.log(error);
        }
    );
  }

  setPaqueteShared(paquete: string){
    this.shared.setPlan(paquete);
    this.grupoSeleccionado = true;
    if(this.shared.getPlan()){
      this.crearRutina();
    }
  }


  crearRutina(){
    const component = this.componentFactoryResolver.resolveComponentFactory(ListaDeGruposComponent);
    this.dynamicComponent.viewContainerRef.createComponent(component);
  }

  destruirRutina(){
    this.dynamicComponent.viewContainerRef.clear();
    this.router.navigateByUrl(`/administrador`)
  }

  deletePlan(plan: string){
    this.planToDelete = plan;
  }

  deleteConfirmation(){
    this.shared.deletePlan(this.planToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Plan eliminado con éxito',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },
      (error) =>{
        this.snackbar.open('Error eliminando el plan, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }
}

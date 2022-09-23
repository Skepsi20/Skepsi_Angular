import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministracionUsuariosService } from 'src/app/services/administracion-usuarios.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'tutores-admin',
  templateUrl: './tutores-admin.component.html',
  styleUrls: ['./tutores-admin.component.css']
})
export class TutoresAdminComponent implements OnInit {
  role = '';
  roles = ['Gimnasio','Tutor','Ventas'];
  empleados:any = [];
  userToDelete:any;

  constructor(
    private snackbar: MatSnackBar,
    private adminService: AdministracionUsuariosService,
    private readonly spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    if(this.role != ''){
      this.spinnerService.show();
      console.log('ROL SELECCIONADO',this.role)
      this.adminService.getUsers(this.role)
      .subscribe(
        (success)=>{
          this.empleados = success
          console.log(success);
          this.spinnerService.hide();
        },(error)=>{
          this.spinnerService.hide();
          console.log(error);
        }
      )
    }
  }


  deleteUser(user: string){
    this.userToDelete = user;
  }

  deleteConfirmation(){
    this.adminService.deleteUser(this.userToDelete)
    .subscribe(
      (sucessResponse)=>{
        this.snackbar.open('Usuario eliminado con éxito',undefined,{
          duration: 2000
        });
        window.location.reload();
      },
      (error) =>{
        this.snackbar.open('Error eliminando al usuario, intente nuevamente.',undefined,{
          duration: 2000
        });
      }
    );
  }

}

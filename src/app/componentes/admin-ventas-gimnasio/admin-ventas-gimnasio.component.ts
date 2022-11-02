import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdministracionUsuariosService } from 'src/app/services/administracion-usuarios.service';

@Component({
  selector: 'app-admin-ventas-gimnasio',
  templateUrl: './admin-ventas-gimnasio.component.html',
  styleUrls: ['./admin-ventas-gimnasio.component.css']
})
export class AdminVentasGimnasioComponent implements OnInit {
  public newProfile = {
    "firstName": '',
    "lastName": '',
    "dateOfBirth": '',
    "gender": '',
    "user": {
      "userName": '',
      "password": '',
      "email": '',
      "phoneNumber": '',
      "roles": ['']
    }
  }
  roles = ['Gimnasio','Administrador','Ventas'];
  generos: Array<string> = ['Masculino','Femenino','Otro'];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  public errorMessage: Array<any> = [];
  public passwordConfirm = '';
  @ViewChild('employeeForm') employeeForm?: NgForm;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email requerido';
    }
    return this.email.hasError('email') ? 'Email no valido' : '';
  }


  constructor(
    private adminService: AdministracionUsuariosService,
    private snackbar: MatSnackBar,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  onAdd():void{
    this.newProfile.user.userName = this.newProfile.user.email;
    this.errorMessage = [];
    if(this.employeeForm?.form.valid){
      this.adminService.addUser(this.newProfile)
      .subscribe(
        (sucessResponse)=>{
          this.snackbar.open('Registro completado con éxito',undefined,{
            duration: 2000
          });
          setTimeout(()=>{
            window.location.reload();
          }, 2000);
        },
        (error) =>{
          if(error.error.DuplicateEmail){
            this.errorMessage.push('El correo  '+this.newProfile.user.email+'  ya está siendo utilizado.')
          }
          if(error.error.PasswordRequiresDigit){
            this.errorMessage.push('La contraseña debe tener al menos 1 dígito.')
          }
          this.snackbar.open('Error creando cuenta, intente nuevamente.',undefined,{
            duration: 2000
          });
        }
      );
    }
  }
}

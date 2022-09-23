import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TutorService } from 'src/app/services/Tutores/tutor.service';
import { SharedService } from 'src/app/services/gestionGrupos/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdministracionUsuariosService } from 'src/app/services/administracion-usuarios.service';

@Component({
  selector: 'app-panel-ventas',
  templateUrl: './panel-ventas.component.html',
  styleUrls: ['./panel-ventas.component.css']
})
export class PanelVentasComponent implements OnInit {
  cookieUser : string = '';
  opcionMenu:any;
  nombreAdmin: string = '';
  mostrarAvatar = false;
  hide = true;

  admin:any = {
    name: '',
    lastName: '',
    password: '',
    currentPassword:'',
    confirmedPassword:'',
    profileImageUrl: '',
    description: ''
  }
  public avatares = [
    'Personajes-14.png',
    'Personajes-12.png',
    'Personajes-09.png',
    'Personajes-10.png',
    'Personajes-11.png',
    'Personajes-08.png',
    'Personajes-07.png',
    'Personajes-06.png',
    'Personajes-05.png',
    'Personajes-15.png',
    'Personajes-13.png',
    'Personajes-04.png',
    'Personajes-03.png',
    'Personajes-02.png',
    'Personajes-01.png',
  ]


  constructor(
    private snackbar: MatSnackBar,
    private cookieService : CookieService,
    private router: Router,
    private readonly tutorService: TutorService,
    private readonly adminService: AdministracionUsuariosService,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.cookieUser = this.cookieService.get('accessToken');
    if(!this.cookieUser){
      this.router.navigate(['inicio']);
    }
    if(localStorage.getItem('vista')){
      this.opcionMenu = localStorage.getItem('vista');
    }
    this.adminService.getData()
    .subscribe(
      (success)=>{
        console.log(success)
        this.admin = success;
        if(this.admin.profileImageUrl == undefined){
          this.admin.profileImageUrl = 'Personajes-03.png'
        }
      },(error)=>{
        console.log(error);
      }
    )
  }

  seleccionMenu(vista:string){
    localStorage.setItem('vista', vista);
    this.opcionMenu = vista;
  }

  updateStudentName(){
    const request = {
      firstName: this.admin.firstName,
      lastName: this.admin.lastName
    }
    this.adminService.updateName(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Nombre actualizado',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },(error)=>{
        this.snackbar.open('Error actualizando el nombre',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  updateStudentPassword(){
    const request = {
      password: this.admin.password,
      confirmedPassword: this.admin.confirmedPassword,
      currentPassword: this.admin.currentPassword
    }
    this.adminService.updatePassword(request)
    .subscribe(
      (success)=>{
        this.snackbar.open('Contraseña actualizada',undefined,{
          duration: 2000
        });
        this.ngOnInit();
      },(error)=>{
        this.snackbar.open('Error actualizando la contraseña',undefined,{
          duration: 2000
        });
        console.log(error);
      }
    )
  }

  mostrarAvatares(){
    this.mostrarAvatar = !this.mostrarAvatar;
  }

  guardarAvatar(avatar:any){
    this.admin.profileImageUrl = avatar;
    this.adminService.updateImage(this.admin.profileImageUrl)
    .subscribe(
      (success)=>{
        console.log(success)
      },(error)=>{
        console.log(error)
      }
    )
  }

  mostrarAvatarActual(){
    this.mostrarAvatares();
  }

  logOut(){
    this.cookieService.delete('accessToken');
    window.location.reload();
    this.router.navigateByUrl(`/inicio`);
  }

}

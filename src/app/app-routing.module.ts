import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutoresComponent } from './componentes/Tutores/tutores/tutores.component';
import { LoginComponent } from './componentes/Auth/login/login.component';
import { RegisterComponent } from './componentes/Auth/register/register.component';
import { UserGuardGuard } from './componentes/Auth/login/user-guard.guard';
import { VentasComponent } from './componentes/Planes/ventas/ventas.component';
import { PaquetesComponent } from './componentes/Planes/paquetes/paquetes.component';
import { InstitucionComponent } from './componentes/Instituciones/institucion/institucion.component';
import { PlanesComponent } from './componentes/GestionGrupos/planes/planes.component';
import { ListaDeGruposComponent } from './componentes/GestionGrupos/lista-de-grupos/lista-de-grupos.component';
import { GrupoDetallesComponent } from './componentes/GestionGrupos/grupo-detalles/grupo-detalles.component';
import { CreacionPlantillasComponent } from './componentes/Plantillas/creacion-plantillas/creacion-plantillas.component';
import { GestionRutinasComponent } from './componentes/Plantillas/gestion-rutinas/gestion-rutinas.component';
import { DetallesPlantillaComponent } from './componentes/Plantillas/detalles-plantilla/detalles-plantilla.component';
import { HolidaysComponent } from './componentes/Plantillas/holidays/holidays.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { ResultadosFiltroComponent } from './componentes/resultados/resultados-filtro/resultados-filtro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';
import { DashboardDetailComponent } from './componentes/dashboard/dashboard-detail/dashboard-detail.component';
import { PaypalComponent } from './componentes/paypal/paypal.component';
import { InicioComponent } from './componentes/Skepsi/inicio/inicio.component';
import { NosotrosComponent } from './componentes/Skepsi/nosotros/nosotros.component';
import { PaquetesSkepsiComponent } from './componentes/Skepsi/paquetes-skepsi/paquetes-skepsi.component';
import { FaqComponent } from './componentes/Skepsi/faq/faq.component';
import { BlogComponent } from './componentes/Skepsi/blog/blog.component';
import { ContactoComponent } from './componentes/Skepsi/contacto/contacto.component';
import { RutinaActualComponent } from './componentes/rutinas/rutina-actual/rutina-actual.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RolesGuard } from './componentes/Auth/login/roles.guard';
import { PosiblesClientesComponent } from './componentes/mensajes/posibles-clientes.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { TutoresDashboardAdminComponent } from './componentes/tutores-dashboard-admin/tutores-dashboard-admin.component';
import { Amaan1012Component } from './componentes/rutinas/RutinasEnDesarrollo/amaan1012/amaan1012.component';
import { Dmaan1012Component } from './componentes/rutinas/RutinasEnDesarrollo/dmaan1012/dmaan1012.component';
import { Emaan1012Component } from './componentes/rutinas/RutinasEnDesarrollo/emaan1012/emaan1012.component';
import { Emaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Exousia/Comprension/emaco1012/emaco1012.component';
import { Dmaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Dynami/Comprension/dmaco1012/dmaco1012.component';
import { ConfirmationComponent } from './componentes/Auth/confirmation/confirmation.component';
import { UserDashboardComponent } from './componentes/user-dashboard/user-dashboard.component';
import { EntrenadorPanelComponent } from './componentes/Tutores/entrenador-panel/entrenador-panel.component';
import { AdminPanelComponent } from './componentes/admin-panel/admin-panel.component';
import { EmailConfirmComponent } from './componentes/Auth/register/email-confirm/email-confirm.component';
import { CodigoComponent } from './componentes/Skepsi/codigo/codigo.component';
import { PanelVentasComponent } from './componentes/panel-ventas/panel-ventas.component';
import { PanelGimnasioComponent } from './componentes/panel-gimnasio/panel-gimnasio.component';
import { ForgotPasswordComponent } from './componentes/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './componentes/Auth/reset-password/reset-password.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { TerminosComponent } from './componentes/Skepsi/terminos/terminos.component';
import { AppComponent } from './app.component';
import { TutoresAdminComponent } from './componentes/Tutores/tutores-admin/tutores-admin.component';
import { AdminVentasGimnasioComponent } from './componentes/admin-ventas-gimnasio/admin-ventas-gimnasio.component';
import { PrivacidadComponent } from './componentes/Skepsi/privacidad/privacidad.component';
import { SuspendidosComponent } from './componentes/suspendidos/suspendidos.component';
import { Amaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Antochi/Comprension/amaco1012/amaco1012.component';
import { FinanzasComponent } from './componentes/finanzas/finanzas/finanzas.component';
import { Aglre1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Antochi/Recuperacion/aglre1012/aglre1012.component';
import { Eglre1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Exousia/Recuperacion/eglre1012/eglre1012.component';
import { Dsyre1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Dynami/Recuperacion/dsyre1012/dsyre1012.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'inicio', component: InicioComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'tutores', component: TutoresComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'ventas', component: VentasComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Ventas']}},
  {path:'paquetes', component: PaquetesComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Ventas','Usuario']}},
  {path:'institucion', component: InstitucionComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Ventas']}},
  {path:'planes', component: PlanesComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'grupos', component: ListaDeGruposComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'grupo-detalles', component: GrupoDetallesComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'creacion-plantillas', component: CreacionPlantillasComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'detalles-plantillas', component: DetallesPlantillaComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'gestion-rutinas', component: GestionRutinasComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'holidays', component: HolidaysComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'resultados-detalles', component: ResultadosComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Usuario','Familiar']}},
  {path:'resultados', component: ResultadosFiltroComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Usuario','Familiar']}},
  {path:'dashboard', component: DashboardComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Tutor']}},
  {path:'dashboard-detalles', component: DashboardDetailComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Tutor']}},
  {path:'paypal', component: PaypalComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Usuario']}},
  {path:'rutina', component: RutinaActualComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Usuario']}},
  {path:'interesados', component: PosiblesClientesComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Ventas']}},
  {path:'admin-dashboard', component: AdminDashboardComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Gimnasio']}},
  {path:'admin-tutor-dashboard', component: TutoresDashboardAdminComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'entrenador', component: EntrenadorPanelComponent, canActivate:[RolesGuard], data:{expectedRole: ['Tutor']}},
  {path:'usuario', component: UserDashboardComponent, canActivate:[RolesGuard], data:{expectedRole: ['Usuario']}},
  {path:'administrador', component: AdminPanelComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'adminTutors', component: TutoresAdminComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'panel-ventas', component: PanelVentasComponent, canActivate:[RolesGuard], data:{expectedRole: ['Ventas']}},
  {path:'suspendidos', component: SuspendidosComponent, canActivate:[RolesGuard], data:{expectedRole: ['Ventas']}},
  {path:'panel-gimnasio', component: PanelGimnasioComponent, canActivate:[RolesGuard], data:{expectedRole: ['Gimnasio']}},
  {path:'adminVentasGimnasio', component: AdminVentasGimnasioComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'finanzas', component: FinanzasComponent, canActivate:[RolesGuard], data:{expectedRole: ['Administrador','Ventas']}},


  {path:'recuperar', component: ForgotPasswordComponent},
  {path:'resetPassword', component: ResetPasswordComponent},
  {path:'emailConfirm', component: EmailConfirmComponent},
  {path:'confirmation', component: ConfirmationComponent},
  {path:'codigo', component: CodigoComponent},
  {path:'terminos', component: TerminosComponent},
  {path:'privacidad', component: PrivacidadComponent},


  {path:'test', component: Eglre1012Component},
  {path:'test-omar', component: Dsyre1012Component},

  //https://www.skepsi.com.mx/#/confirm-email?email=rixflos77@gmail.com&token=CfDJ8H7g1sKTX9xBlBUi+eUBYoN3X3Ff3NBDHOpzFSfD1/b61DMU+uZrWa57L2v5w6zKgOoATD4/ckqcTxsXBHjN8XQZ5WYdjXozhEbhU4N2yB2xBLm0KOxZeYgfjLf6sT+TGuuySBMBe3yinIt+k8z0OMz8v7X1qBfux5Fji1Lmt2eVH81niLwtxhv0INBWXGVGNKdnluLmilKBngyaoN8sT+4n8SDWY3fRkuuuQIs7swPzTHLgKJiAz9E/9glDVIESRQ==


  /* Rutinas DANIEL */
  {path:'amaan', component: Amaan1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'dmaan', component: Dmaan1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'emaan', component: Emaan1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'amaco', component: Emaco1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'dmaco', component: Dmaco1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},
  {path:'emaco', component: Emaco1012Component, canActivate:[RolesGuard], data:{expectedRole: ['Administrador']}},


  /*LANDING PAGE ROUTES*/
  {path:'nosotros', component: NosotrosComponent},
  {path:'paquetes-skepsi', component: PaquetesSkepsiComponent},
  {path:'faq', component: FaqComponent},
  {path:'blog', component: BlogComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

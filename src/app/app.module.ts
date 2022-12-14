import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TutoresComponent } from './componentes/Tutores/tutores/tutores.component';
import { LoginComponent } from './componentes/Auth/login/login.component';
import { RegisterComponent } from './componentes/Auth/register/register.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './componentes/Auth/login/jwt-interceptor.interceptor';
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
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { ResultadosFiltroComponent } from './componentes/resultados/resultados-filtro/resultados-filtro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';
import { DashboardDetailComponent } from './componentes/dashboard/dashboard-detail/dashboard-detail.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './componentes/paypal/paypal.component';
import { InicioComponent } from './componentes/Skepsi/inicio/inicio.component';
import { NosotrosComponent } from './componentes/Skepsi/nosotros/nosotros.component';
import { FaqComponent } from './componentes/Skepsi/faq/faq.component';
import { BlogComponent } from './componentes/Skepsi/blog/blog.component';
import { ContactoComponent } from './componentes/Skepsi/contacto/contacto.component';
import { PaquetesSkepsiComponent } from './componentes/Skepsi/paquetes-skepsi/paquetes-skepsi.component';
import { RutinaActualComponent } from './componentes/rutinas/rutina-actual/rutina-actual.component';
import { DynamicComponentDirective } from './componentes/rutinas/dynamic-component.directive';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { PosiblesClientesComponent } from './componentes/mensajes/posibles-clientes.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { TutoresDashboardAdminComponent } from './componentes/tutores-dashboard-admin/tutores-dashboard-admin.component';
import { ConfirmationComponent } from './componentes/Auth/confirmation/confirmation.component';
import { UserDashboardComponent } from './componentes/user-dashboard/user-dashboard.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EntrenadorPanelComponent } from './componentes/Tutores/entrenador-panel/entrenador-panel.component';
import { AdminPanelComponent } from './componentes/admin-panel/admin-panel.component';
import { FooterComponent } from './componentes/Skepsi/footer/footer.component';
import { EmailConfirmComponent } from './componentes/Auth/register/email-confirm/email-confirm.component';
import { CodigoComponent } from './componentes/Skepsi/codigo/codigo.component';
import { PanelVentasComponent } from './componentes/panel-ventas/panel-ventas.component';
import { PanelGimnasioComponent } from './componentes/panel-gimnasio/panel-gimnasio.component';
import { ForgotPasswordComponent } from './componentes/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './componentes/Auth/reset-password/reset-password.component';
import { TerminosComponent } from './componentes/Skepsi/terminos/terminos.component';
import { TutoresAdminComponent } from './componentes/Tutores/tutores-admin/tutores-admin.component';
import { AdminVentasGimnasioComponent } from './componentes/admin-ventas-gimnasio/admin-ventas-gimnasio.component';
import { ChatbotComponent } from './componentes/Skepsi/chatbot/chatbot.component';
import { PrivacidadComponent } from './componentes/Skepsi/privacidad/privacidad.component';
import { SuspendidosComponent } from './componentes/suspendidos/suspendidos.component';
import { ChatbotTutorComponent } from './componentes/Tutores/chatbot-tutor/chatbot-tutor.component';
import { FinanzasComponent } from './componentes/finanzas/finanzas/finanzas.component';
import { SortablejsModule } from 'ngx-sortablejs';

//Rutinas
//AMAAN-DMAAN-EMAAN
import { Amaan1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Antochi/Analisis/amaan1012/amaan1012.component';
import { Dmaan1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Dynami/Analisis/dmaan1012/dmaan1012.component';
import { Emaan1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Exousia/Analisis/emaan1012/emaan1012.component';
//AMACO-DMACO-EMAC0
import { Amaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Antochi/Comprension/amaco1012/amaco1012.component';
import { Dmaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Dynami/Comprension/dmaco1012/dmaco1012.component';
import { Emaco1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Exousia/Comprension/emaco1012/emaco1012.component';
//AGNRE-DGNRE-EGNRE
import { AGNRE1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Antochi/Recuperacion/agnre1012/agnre1012.component';
import { DGNRE1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Dynami/Recuperacion/dgnre1012/dgnre1012.component';
import { EGNRE1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Exousia/Recuperacion/egnre1012/egnre1012.component';
//AGLRE-DGLRE-EGLRE
import { Aglre1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Antochi/Recuperacion/aglre1012/aglre1012.component';
import { DGLRE1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Dynami/Recuperacion/dglre1012/dglre1012.component';
import { Eglre1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Exousia/Recuperacion/eglre1012/eglre1012.component';
//ASYRE-DSYRE-ESYRE
import { Asyre1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Antochi/Recuperacion/asyre1012/asyre1012.component';
import { Dsyre1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Dynami/Recuperacion/dsyre1012/dsyre1012.component';
import { AMARE1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Antochi/Recuperacion/amare1012/amare1012.component';
import { DGLCO1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Dynami/Comprension/dglco1012/dglco1012.component';
import { Esyre1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Exousia/Recuperacion/esyre1012/esyre1012.component';
import { EGLCO1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Exousia/Comprension/eglco1012/eglco1012.component';
import { AGLCO1012Component } from './componentes/rutinas/RutinasTerminadas/Glossa/Antochi/Comprension/aglco1012/aglco1012.component';
import { AGNCO1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Antochi/Comprension/agnco1012/agnco1012.component';
import { Dsyco1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Dynami/Comprension/dsyco1012/dsyco1012.component';
import { DMARE1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Dynami/Recuperacion/dmare1012/dmare1012.component';
import { EMARE1012Component } from './componentes/rutinas/RutinasTerminadas/Mathimatiki/Exousia/Recuperacion/emare1012/emare1012.component';
import { EGNCO1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Exousia/Comprension/egnco1012/egnco1012.component';
import { DGNCO1012Component } from './componentes/rutinas/RutinasTerminadas/Gnostiki/Dynami/Comprension/dgnco1012/dgnco1012.component';
import { CreacionGruposComponent } from './componentes/creacion-grupos/creacion-grupos.component';
import { SesionesDiariasComponent } from './componentes/sesiones-diarias/sesiones-diarias.component';
import { Asyco1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Antochi/Comprension/asyco1012/asyco1012.component';
import { Esyco1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Exousia/Comprension/esyco1012/esyco1012.component';
import { Dsyan1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Dynami/Analisis/dsyan1012/dsyan1012.component';
import { Asyan1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Antochi/Analisis/asyan1012/asyan1012.component';
import { Esyan1012Component } from './componentes/rutinas/RutinasTerminadas/Synaisthimata/Exousia/Analisis/esyan1012/esyan1012.component';

//AMARE-DMARE-EMARE








FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    TutoresComponent,
    AGNRE1012Component,
    EGNRE1012Component,
    DGLRE1012Component,
    LoginComponent,
    RegisterComponent,
    VentasComponent,
    PaquetesComponent,
    InstitucionComponent,
    PlanesComponent,
    ListaDeGruposComponent,
    GrupoDetallesComponent,
    CreacionPlantillasComponent,
    GestionRutinasComponent,
    DetallesPlantillaComponent,
    HolidaysComponent,
    ResultadosComponent,
    SpinnerComponent,
    ResultadosFiltroComponent,
    DashboardComponent,
    DashboardDetailComponent,
    PaypalComponent,
    InicioComponent,
    NosotrosComponent,
    FaqComponent,
    BlogComponent,
    ContactoComponent,
    PaquetesSkepsiComponent,
    RutinaActualComponent,
    DynamicComponentDirective,
    DGNRE1012Component,
    NotFoundComponent,
    PosiblesClientesComponent,
    AdminDashboardComponent,
    TutoresDashboardAdminComponent,
    Amaan1012Component,
    Dmaan1012Component,
    Emaan1012Component,
    Amaco1012Component,
    Dmaco1012Component,
    Emaco1012Component,
    ConfirmationComponent,
    UserDashboardComponent,
    EntrenadorPanelComponent,
    AdminPanelComponent,
    FooterComponent,
    EmailConfirmComponent,
    CodigoComponent,
    PanelVentasComponent,
    PanelGimnasioComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TerminosComponent,
    TutoresAdminComponent,
    AdminVentasGimnasioComponent,
    ChatbotComponent,
    PrivacidadComponent,
    SuspendidosComponent,
    ChatbotTutorComponent,
    FinanzasComponent,
    Aglre1012Component,
    Dsyre1012Component,
    Eglre1012Component,
    Asyre1012Component,
    AMARE1012Component,
    DGLCO1012Component,
    Esyre1012Component,
    EGLCO1012Component,
    AGLCO1012Component,
    AGNCO1012Component,
    Dsyco1012Component,
    DMARE1012Component,
    EMARE1012Component,
    DGNCO1012Component,
    EGNCO1012Component,
    CreacionGruposComponent,
    SesionesDiariasComponent,
    Asyco1012Component,
    Esyco1012Component,
    Dsyan1012Component,
    Asyan1012Component,
    Esyan1012Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    FullCalendarModule,
    SortablejsModule.forRoot({ animation: 150 })
  ]
  ,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    CookieService,DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, filter, switchMap, take, map, finalize } from 'rxjs/operators';
import {Router} from "@angular/router";
import { StudentService } from 'src/app/services/Auth/student.service';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  public userJson : any = '';
  public tokenDecoded: any;
  public newToken:any;
  isRefreshing = false;
  refreshTokenSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private studentService: StudentService,
    private dialog: MatDialog,
  ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    const token: string = this.cookieService.get('accessToken');
    const isSignIn = request.url.includes('api/authentication/login');


    if(token != null){
      request = this.addTokenHeader(request,token);
    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !isSignIn && error.status === 401) {

      if(error.error?.code == 1){
        window.confirm("Tu sesión de SKEPSI está abierta en otra ventana, inicia sesión para continuar.")
        window.location.reload();
      }
      if(error.error?.code == 4){
        window.confirm("Tu cuenta se encuentra suspendida, contacta a ventas@skepsi.com.mx para revisar tu caso.")
        window.location.reload();
      }
      if(error.error?.code == 3){
        window.confirm("Tu cuenta se encuentra desactivada por alguna falta.")
        window.location.reload();
      }

      return this.handle401Error(request, next);
    }
      return throwError(error);
    }));


  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken: string = this.cookieService.get('refreshToken');
      const accessToken: string = this.cookieService.get('accessToken');
      const requestData = {
        accessToken:accessToken,
        refreshToken:refreshToken
      }

      if (refreshToken)
        return this.studentService.refreshToken(requestData).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            this.cookieService.set('accessToken', response.accessToken);
            this.cookieService.set('refreshToken', response.refreshToken);
            this.refreshTokenSubject.next(response.accessToken);
            return next.handle(this.addTokenHeader(request, response.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.cookieService.delete('accessToken');
            this.cookieService.delete('refreshToken');
            this.router.navigateByUrl(`/inicio`)
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    //Se agrega el encabezado de autorization con la palabra Bearer para que la api acepte el request
    return request.clone({
      setHeaders: { authorization: `Bearer ${token}` }
    });
  }
}

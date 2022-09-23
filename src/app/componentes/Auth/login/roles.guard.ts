import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class RolesGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      const token: string = this.cookieService.get('accessToken');
      const expectedRoles = route.data['expectedRole'];

      if(token){
        const tokenDecoded:any = jwt_decode(token);
        const role = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const roleArray:any = []
        if(!Array.isArray(role)){
          roleArray.push(role);
        }
        const existingRole = roleArray.every((element:any) => {
          return expectedRoles.includes(element);
        });
        console.log("EXPECTED ROLES",expectedRoles)
        console.log("ROLE",roleArray)
        return existingRole
      }
      return false;
  }

}

import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from "@angular/router";
import { UtilesService } from "src/app/core/services/utiles.service";
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
  constructor(public router: Router, private utilesService: UtilesService) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
                console.error("Error Event");
            } else {
                // console.log(`error status : ${error.status} ${error.statusText}`);
                switch (error.status) {
                    case 401:      //login
                        this.router.navigateByUrl("/login");
                        break;
                    case 403:     //forbidden
                        this.router.navigateByUrl("/unauthorized");
                        break;
                    default: 
                        this.utilesService.showToast(error.error.detail);
                        break;
                }
            } 
        } else {
            this.utilesService.showAlert("Une erreur est survenue du serveur. Veuillez-réessayer plus tard");
        }
        return throwError(error);
      })
    )
  }
}
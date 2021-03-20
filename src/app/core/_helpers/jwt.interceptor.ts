import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError } from 'rxjs/operators';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.authenticationService.currentUser.subscribe(
            (data) => {
                if (data && data["token"]) {
                    console.log(data["token"]);
                    request = request.clone({
                        setHeaders: { 
                            Authorization: `Bearer ${data["token"]}`
                        }
                    });
                }
            }
        );
        return next.handle(request);
    }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from 'app/main/authentication/authentication.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: KeycloakService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const access_token = this.authenticationService.getToken().then( value => { 
            //this return will `return` value in chained manner
        console.log(value);
        if (value) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${value}`
                }
            });
        }
        return value ; 


          });
        // const headers = new HttpHeaders({
        //     'Authorization': `Bearer ${access_token}`,
        //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //     'Accept': 'application/json'
        //   });
        // console.log(access_token);
        

        return next.handle(request);
    }
}

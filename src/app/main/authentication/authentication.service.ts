import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { environment } from 'environments/environment.prod';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    // tslint:disable-next-line:typedef
    login(email: string, password: string) {


        const loginPayload = new HttpParams()
        .set('username', email)
        .set('password', password)
        .set('grant_type', 'password');
  
    //   this.apiService.login(body.toString()).subscribe(data => {
    //     window.sessionStorage.setItem('token', JSON.stringify(data));
    //     console.log(window.sessionStorage.getItem('token'));
    //     this.router.navigate(['list-user']);
    //   }, error => {
    //       alert(error.error.error_description)
    //   });

      const headers = {
        'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
        'Content-type': 'application/x-www-form-urlencoded'
      }
    //   return this.http.post('http://localhost:8080/' + 'oauth/token', loginPayload, {headers});

        return this.http.post<any>(`${environment.apiUrlAuth}/oauth/token`, loginPayload, {headers})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    // tslint:disable-next-line:typedef
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

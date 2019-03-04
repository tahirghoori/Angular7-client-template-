import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { environment } from 'environments/environment.prod';
import { CompanyRegister } from '../company/companyRegister.model';
import { CompanyChangePassword } from '../company/company-change-password/companyChangePassword.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:typedef
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    // tslint:disable-next-line:typedef
    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    // tslint:disable-next-line:typedef
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

      // tslint:disable-next-line:typedef
      companyRegister(user: CompanyRegister) {
        return this.http.post(`${environment.apiUrlAuth}/company/register`, user);
    }

       // tslint:disable-next-line:typedef
       companyChagnePassword(user: CompanyChangePassword) {
        return this.http.post(`${environment.apiUrlAuth}/company/changepassword`, user);
    }

    // tslint:disable-next-line:typedef
    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    // tslint:disable-next-line:typedef
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}

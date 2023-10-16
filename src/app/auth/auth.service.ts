import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/envoronment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Credentials} from "./models/credentials";
import {map} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseURl = environment.baseUrl;

    private http: HttpClient = inject(HttpClient);

    constructor() {
    }

    getToken() {
        let token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : null;
    }

    login(credentials: Credentials) {
        return this.http.post(`${this.baseURl}/login`, credentials, {observe: 'response'})
            .pipe(map((response: HttpResponse<any>) => {
                const body = response.body;
                const headers = response.headers;

                const bearerToken = headers.get('Authorization')!;
                const token = bearerToken?.replace('Bearer ', '');

                localStorage.setItem('token', token);

                return body;
            }));
    }
}

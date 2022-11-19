import {
    HttpClient,
    HttpEvent,
    HttpParams,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from 'app/models/User'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = environment.apiUrl
    constructor(private http: HttpClient) {}
    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}user/${id}`)
    }

    verifyUser(id: string, token: string): Observable<Object> {
        return this.http.post<Object>(
            `${this.apiUrl}verifyEmail?id=${id}&token=${token}`,
            null
        )
    }

    resendMail(id: string): Observable<Object> {
        return this.http.post<Object>(
            `${this.apiUrl}resendVerifyEmail?id=${id}`,
            null
        )
    }
    forgotPassword(email: string): Observable<Object> {
        return this.http.post<Object>(
            `${this.apiUrl}forgot-password?email=${email}`,
            null
        )
    }

    resendResetPasswordEmail(id: string): Observable<Object> {
        return this.http.post<Object>(
            `${this.apiUrl}resendResetPasswordEmail?id=${id}`,
            null
        )
    }

    resetPassowrd(
        id: string,
        token: string,
        password: string
    ): Observable<Object> {
        return this.http.post<Object>(
            `${this.apiUrl}reset-password?id=${id}&token=${token}&password=${password}`,
            null
        )
    }
}

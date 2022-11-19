import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, tap } from 'rxjs'
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private API_URL = environment.apiUrl

    constructor(private http: HttpClient) {}
    register(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        const form = new FormData()
        form.append('firstName', firstName)
        form.append('lastName', lastName)
        form.append('email', email)
        form.append('password', password)

        return this.http.post(this.API_URL + 'register', form).pipe(
            tap((response: any) => {
                console.log(response)
            })
        )
    }
}

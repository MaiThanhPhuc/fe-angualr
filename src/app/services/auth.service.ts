import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, tap } from 'rxjs'
import { environment } from 'environments/environment'
import { Router } from '@angular/router'
import { BadgeService } from 'app/components/badge/badge.service'

import jwt_decode from 'jwt-decode'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    private API_URL = environment.apiUrl
    private readonly TOKEN_NAME = 'token'
    isLoggedIn = this._isLoggedIn$.asObservable()
    get token() {
        return localStorage.getItem(this.TOKEN_NAME)
    }

    getDecodedAccessToken() {
        try {
            var data: any = jwt_decode(JSON.stringify(this.token!))
        } catch (error) {
            console.log(error)
        }
        localStorage.setItem('userId', data.nameid)
    }
    constructor(
        private router: Router,
        private http: HttpClient,
        private badgeService: BadgeService
    ) {
        this._isLoggedIn$.next(!!this.token)
    }

    login(email: string, password: string) {
        const form = new FormData()
        form.append('email', email)
        form.append('password', password)
        return this.http.post(this.API_URL + 'login', form).pipe(
            tap((response: any) => {
                if (response.statusCode == 200) {
                    localStorage.setItem(this.TOKEN_NAME, response.data)
                    this._isLoggedIn$.next(true)
                    this.getDecodedAccessToken()
                }
            })
        )
    }

    logout() {
        this._isLoggedIn$.next(false)
        localStorage.clear()
        this.router.navigate(['/login'])
    }
}

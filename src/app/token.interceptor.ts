import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const headers = new HttpHeaders().set(
            'Authorization',
            'Bearer ' + this.authService.token
        )
        const AuthRequest = request.clone({ headers: headers })
        return next.handle(AuthRequest)
    }
}

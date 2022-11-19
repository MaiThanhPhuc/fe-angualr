import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    isLogin!: boolean

    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn.subscribe((d) => (this.isLogin = d))
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.isLogin) {
            return true
        }
        this.router.navigate([''])
        return false
    }
}

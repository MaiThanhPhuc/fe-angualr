import { Component, OnInit } from '@angular/core'
import { AuthService } from 'app/services/auth.service'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public isOpenHamburger = false
    constructor(private authService: AuthService) {}
    ngOnInit(): void {}

    onOpenHamburger() {
        this.isOpenHamburger = !this.isOpenHamburger
    }
    Logout() {
        this.authService.logout()
    }
}

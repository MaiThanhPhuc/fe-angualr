import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { LoadingService } from 'app/components/loading/loading.service'
import { BadgeService } from 'app/components/badge/badge.service'
import { AuthService } from 'app/services/auth.service'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    submitted = false
    isShowPassword = false
    isShowRePassword = false
    message = 'abc'
    constructor(
        private fb: FormBuilder,
        public loaderService: LoadingService,
        private authService: AuthService,
        private router: Router,
        private badgeService: BadgeService
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ]),
            ],
            password: ['', Validators.compose([Validators.required])],
        })
    }

    get loginFormControl(): { [key: string]: AbstractControl } {
        return this.loginForm.controls
    }

    loginUser() {
        this.submitted = true
        if (this.loginForm.valid) {
            this.authService
                .login(
                    this.loginForm.get('email')?.value,
                    this.loginForm.get('password')?.value
                )
                .subscribe(
                    (response: any) => {
                        console.log(response)
                        if (response.statusCode === 200) {
                            this.router.navigate(['/dashboard'])
                        }
                    },
                    (error: any) => {
                        console.log(error)
                        this.badgeService.onShowBadge(
                            true,
                            false,
                            error.error.message ?? 'Server not found'
                        )
                    }
                )
        }
    }

    onShowPassword() {
        this.isShowPassword = !this.isShowPassword
    }
}

import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControlOptions,
    AbstractControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { RegisterService } from 'app/services/register.service'
import { CustomValidationService } from '../../validators/custom.validation.service'
import { BadgeService } from 'app/components/badge/badge.service'
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup
    submitted = false
    isShowPassword = false
    isShowRePassword = false

    constructor(
        private fb: FormBuilder,
        private customValidator: CustomValidationService,
        private registerService: RegisterService,
        private router: Router,
        private badgeService: BadgeService
    ) {}

    ngOnInit() {
        this.registerForm = this.fb.group(
            {
                fname: ['', Validators.required],
                lname: ['', Validators.required],
                email: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                        ),
                    ]),
                ],
                password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                        ),
                    ]),
                ],
                repassword: ['', [Validators.required]],
            },
            {
                validator: this.customValidator.confirmPasswordValidator(
                    'password',
                    'repassword'
                ),
            } as AbstractControlOptions
        )
    }

    get registerFormControl(): { [key: string]: AbstractControl } {
        return this.registerForm.controls
    }

    registerUser() {
        this.badgeService.onShowPending(true, true, 'Register is pending...')
        if (this.registerForm.valid) {
            this.submitted = true
            this.registerService
                .register(
                    this.registerForm.get('fname')?.value,
                    this.registerForm.get('lname')?.value,
                    this.registerForm.get('email')?.value,
                    this.registerForm.get('password')?.value
                )
                .subscribe(
                    (response: any) => {
                        this.badgeService.onShowPending(false, false)
                        this.badgeService.onShowBadge(
                            true,
                            true,
                            response.message
                        )
                        console.log(response)
                        setTimeout(() => {
                            this.router.navigate(['/login'])
                        }, 3000)
                    },
                    (error: any) => {
                        console.log(error)
                        this.badgeService.onShowPending(false, false)
                        this.badgeService.onShowBadge(
                            true,
                            false,
                            error.error.message ?? 'Server not found'
                        )
                        console.log(error.error.message)
                    }
                )
        }
    }

    onShowPassword() {
        this.isShowPassword = !this.isShowPassword
    }
    onShowRePassword() {
        this.isShowRePassword = !this.isShowRePassword
    }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from 'app/services/user.service'

import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControlOptions,
    AbstractControl,
} from '@angular/forms'
import { CustomValidationService } from '../../validators/custom.validation.service'
import { BadgeService } from 'app/components/badge/badge.service'
@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    resetForm!: FormGroup
    isShowPassword = false
    isShowRePassword = false
    submitted = false
    isExpired = false
    isSuccess = false
    userId: string = ''
    token: string = ''
    constructor(
        private fb: FormBuilder,
        private customValidator: CustomValidationService,
        private route: ActivatedRoute,
        private userService: UserService,
        private badgeService: BadgeService,
        private router: Router
    ) {
        this.resetForm = this.fb.group(
            {
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

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id')!
        this.token = this.route.snapshot.paramMap.get('token')!
    }

    get resetFormControl(): { [key: string]: AbstractControl } {
        return this.resetForm.controls
    }
    onResetPassword() {
        if (this.resetForm.valid) {
            this.submitted = true
            this.userService
                .resetPassowrd(
                    this.userId,
                    this.token,
                    this.resetForm.get('password')?.value
                )
                .subscribe(
                    (response: any) => {
                        this.isSuccess = true
                        console.log(response)
                    },
                    (error: any) => {
                        console.log(error.message)
                        console.log(error)
                        this.badgeService.onShowBadge(
                            true,
                            false,
                            error.error.message
                        )

                        if (error.status == 401) {
                            this.isSuccess = true
                            this.isExpired = true
                        }
                    }
                )
        }
    }
    onResendResetPasswordEmail() {
        this.userService.resendResetPasswordEmail(this.userId).subscribe(
            (response: any) => {
                console.log(123)
                this.badgeService.onShowBadge(true, true, response.message)
                console.log(response)
                setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000)
            },
            (error: any) => {
                console.log(error)
                this.badgeService.onShowBadge(true, false, error.error.message)
            }
        )
    }

    onShowPassword() {
        this.isShowPassword = !this.isShowPassword
    }
    onShowRePassword() {
        this.isShowRePassword = !this.isShowRePassword
    }
}

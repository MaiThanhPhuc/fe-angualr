import { Component, OnInit } from '@angular/core'
import { UserService } from 'app/services/user.service'
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms'
import { BadgeService } from 'app/components/badge/badge.service'
import { Router } from '@angular/router'
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    recoverForm!: FormGroup
    submitted = false

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private badgeService: BadgeService,
        private router: Router
    ) {
        this.recoverForm = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ]),
            ],
        })
    }

    get recoverFormControl(): { [key: string]: AbstractControl } {
        return this.recoverForm.controls
    }
    ngOnInit(): void {}

    onSendEmail() {
      if(this.recoverForm.valid) {
        this.userService
            .forgotPassword(this.recoverForm.get('email')?.value)
            .subscribe(
                (response: any) => {
                    this.badgeService.onShowBadge(true, true, response.message)
                    setTimeout(() => {
                        this.submitted = true
                        this.router.navigate(['/login'])
                    }, 3000)
                },
                (error: any) => {
                    this.badgeService.onShowBadge(
                        true,
                        false,
                        error.error.message
                    )
                }
            )
      }
    }
}

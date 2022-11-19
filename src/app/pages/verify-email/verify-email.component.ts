import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BadgeService } from 'app/components/badge/badge.service'
import { UserService } from 'app/services/user.service'
@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
    isExpired = false
    isSuccess = false
    userId: string = ''
    token: string = ''
    constructor(
        private badgeService: BadgeService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id')!
        this.token = this.route.snapshot.paramMap.get('token')!
        this.onVerifyEmail()
    }

    onVerifyEmail() {
        this.userService.verifyUser(this.userId, this.token).subscribe(
            (response: any) => {
                console.log(response.message)
                console.log(response.name)
                this.isSuccess = true
            },
            (error: any) => {
                console.log(error)
                this.isExpired = true
            }
        )
    }

    onResendVerifyEmail() {
        this.userService.resendMail(this.userId).subscribe(
            (response: any) => {
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
}

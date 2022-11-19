import { Component, OnInit } from '@angular/core'
import { BadgeService } from 'app/components/badge/badge.service'
import { DialogService } from 'app/components/dialog/dialog.service'
import { User } from 'app/models/User'
import { ProfileService } from 'app/services/profile.service'
import { UserService } from 'app/services/user.service'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    public isOpenHamburger = false
    public isUploadSuccess = false
    public isPendingUpload = false
    public currentButton = 0
    showDialog = false
    image = 'data:image/jpeg;base64,'
    userId = localStorage.getItem('userId')
    user: User = {
        userId: '123489',
        firstName: 'Hoang',
        lastName: 'Hoa',
        email: 'mail@mail.com',
    }
    listSideBarAction = [
        {
            name: 'Profile',
            plug: 'profile',
        },
        {
            name: 'Tab',
            plug: 'tab',
        },
        {
            name: 'Setting',
            plug: 'setting',
        },
    ]
    constructor(
        private userService: UserService,
        private profileService: ProfileService,
        public dialogService: DialogService,
        public badgeService: BadgeService
    ) {}

    ngOnInit(): void {
        this.dialogService.showDialog.subscribe((d) => (this.showDialog = d))
        this.profileService.image.subscribe((d) => (this.image = d))
        this.onGetUser()
        this.onGetProfile()
    }
    onGetUser(): void {
        this.userService.getUser(this.userId!).subscribe(
            (response: any) => {
                this.user.firstName = response.data.firstName
                this.user.lastName = response.data.lastName
                this.user.email = response.data.email
            },
            (error) => console.log(error)
        )
    }
    onGetProfile(): void {
        this.profileService.getProfile(this.userId!).subscribe(
            (response: any) => {
                console.log(response)
                const temp: string = response.data.image
                this.image = this.image.concat(temp)
            },
            (error) => {
                this.image = this.image.concat('null')
                console.log(error)
            }
        )
    }
    onOpenHamburger() {
        this.isOpenHamburger = !this.isOpenHamburger
    }
}

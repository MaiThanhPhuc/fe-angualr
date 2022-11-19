import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { BadgeService } from 'app/components/badge/badge.service'
import { DialogService } from 'app/components/dialog/dialog.service'
import { ProfileService } from 'app/services/profile.service'

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
    isPendingUpload = false
    userId = localStorage.getItem('userId')!
    fileUpload = null
    imageSrc: any
    imagePath = ''
    @ViewChild('file') myInputVariable!: ElementRef
    constructor(
        public dialogService: DialogService,
        public badgeService: BadgeService,
        private readonly profileService: ProfileService
    ) {}

    ngOnInit(): void {}

    onUpLoadImage() {
        this.isPendingUpload = !this.isPendingUpload
        this.profileService
            .uploadImage(this.userId, this.fileUpload!)
            .subscribe(
                (response: any) => {
                    console.log(response)
                },
                (error: any) => {
                    this.badgeService.onShowBadge(
                        true,
                        false,
                        'Server not found!'
                    )
                    this.dialogService.onShowDialog(false)
                    console.log(error)
                },
                () => {
                    setTimeout(() => {
                        this.dialogService.onShowDialog(false)
                        this.isPendingUpload = !this.isPendingUpload
                        this.badgeService.onShowBadge(
                            true,
                            true,
                            'Upload image sucess 🎉!'
                        )
                    }, 2000)
                    var reader = new FileReader()
                    reader.readAsDataURL(this.fileUpload!)
                    reader.onload = (_event) => {
                        this.profileService.image.next(reader.result)
                    }
                }
            )
    }
    reset() {
        this.myInputVariable.nativeElement.value = ''
        this.imageSrc = ''
        this.imagePath = ''
        this.fileUpload = null
    }
    preview(files: any) {
        console.log(files)
        if (files.length === 0) return
        console.log(files)
        var typeFile = files[0].type
        var accecptTypeFile = ['image/png', 'image/jpg', 'image/jpeg']
        if (files[0].size > 5242880 || !accecptTypeFile.includes(typeFile)) {
            this.badgeService.onShowBadge(
                true,
                false,
                'File size too big or type not support !'
            )
            this.reset()
            return
        }
        this.fileUpload = files[0]
        this.imagePath = files[0].name
        var reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (_event) => {
            this.imageSrc = reader.result
        }
    }
}

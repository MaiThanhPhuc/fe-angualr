import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    constructor() {}

    listSideBarAction = [
        {
            name: 'Profile',
            slug: 'profile',
            icon: './assets/icons/profile.svg',
        },
        {
            name: 'Tab',
            slug: 'tab',
            icon: './assets/icons/setting.svg',
        },
        {
            name: 'Setting',
            slug: 'setting',
            icon: './assets/icons/setting.svg',
        },
    ]
    ngOnInit(): void {}
}

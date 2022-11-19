import { Component, OnInit } from '@angular/core'
import { BadgeService } from 'app/components/badge/badge.service'

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
    badgeType = false
    showBadge = false
    content = ''
    isPending = false
    constructor(public badgeService: BadgeService) {
        this.badgeService.badgeType.subscribe((d) => (this.badgeType = d))
        this.badgeService.showBadge.subscribe((d) => (this.showBadge = d))
        this.badgeService.content.subscribe((d) => (this.content = d))
        this.badgeService.isPending.subscribe((d) => (this.isPending = d))
    }
    ngOnInit(): void {}
}

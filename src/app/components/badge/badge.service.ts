import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BadgeService {
    public badgeType = new Subject<boolean>()
    public isPending = new Subject<boolean>()
    public showBadge = new Subject<boolean>()
    public content = new Subject<string>()
    constructor() {}

    onShowBadge(show: boolean, type: boolean, content: string) {
        this.showBadge.next(show)
        this.badgeType.next(type)
        this.content.next(content)
        setTimeout(() => {
            this.showBadge.next(false)
        }, 4000)
    }
    onShowPending(
        show: boolean,
        pending: boolean,
        content: string = 'Pending...'
    ) {
        this.showBadge.next(show)
        this.content.next(content)
        this.isPending.next(pending)
    }
    onHideBadge() {
        this.showBadge.next(false)
    }
}

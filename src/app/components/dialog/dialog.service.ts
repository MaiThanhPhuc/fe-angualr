import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    public showDialog = new Subject<boolean>()
    constructor() {}

    onShowDialog(status: boolean) {
        this.showDialog.next(status)
    }
}

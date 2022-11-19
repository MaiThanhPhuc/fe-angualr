import {
    HttpClient,
    HttpEvent,
    HttpParams,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Profile } from 'app/models/Profile'
import { environment } from 'environments/environment'
import { Observable, Subject } from 'rxjs'
@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    private apiUrl = environment.apiUrl
    userId = localStorage.getItem('userId')!
    // image for component
    public image = new Subject<any>()
    ///////////////////////
    constructor(private http: HttpClient) {}
    getProfile(id: string): Observable<Profile> {
        return this.http.get<Profile>(`${this.apiUrl}profile/${this.userId}`)
    }
    uploadImage(userId: string, file: File): Observable<HttpEvent<any>> {
        let formData = new FormData()
        formData.append('userId', userId)
        formData.append('file', file)
        let params = new HttpParams()
        const options = {
            params: params,
            reportProgress: true,
        }
        const req = new HttpRequest(
            'POST',
            `${this.apiUrl}saveImage`,
            formData,
            options
        )
        return this.http.request(req)
    }
}

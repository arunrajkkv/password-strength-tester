import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AppService {

    baseUrl = '';

    constructor(private httpClient: HttpClient) {
        this.baseUrl = this.getBaseHref();
    }

    getBaseHref() {
        return (document.getElementsByTagName('base')[0]).href;
    }

    getMessageFromBackend() {
        return this.httpClient.get(this.baseUrl + 'status');
    }


}

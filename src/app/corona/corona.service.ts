import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CoronaService {

    private srcUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';

    constructor(private http: HttpClient) {
        this.loadCoronaData();
    }

    private loadCoronaData() {
        this.http.get(this.srcUrl, {responseType: 'text'}).subscribe(
            data => {
            },
            error => {
            }
        );
    }
}

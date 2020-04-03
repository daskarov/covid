import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

export interface LandDesc {
    code: string;
    label: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'US Covid-19';

    languages: Array<LandDesc> = [
        {code: 'en', label: 'English'},
        {code: 'es', label: 'Español'},
        {code: 'fr', label: 'Français'}
    ];

    constructor(public router: Router, @Inject(LOCALE_ID) public localeId: string) {
        router.navigate(['covid']).then();
    }
}

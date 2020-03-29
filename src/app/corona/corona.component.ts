import { Component, OnInit } from '@angular/core';
import { CoronaService } from './corona.service';

@Component({
    selector: 'app-corona',
    templateUrl: './corona.component.html',
    styleUrls: ['./corona.component.scss']
})
export class CoronaComponent implements OnInit {

    constructor(private coronaService: CoronaService) {
    }

    ngOnInit() {
    }

}

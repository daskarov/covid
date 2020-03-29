import { Component, OnInit } from '@angular/core';
import { CoronaService, State } from './corona.service';
import { DataFrame } from 'dataframe-js';

@Component({
    selector: 'app-corona',
    templateUrl: './corona.component.html',
    styleUrls: ['./corona.component.scss']
})
export class CoronaComponent implements OnInit {

    state = null;

    constructor(private coronaService: CoronaService) {
    }

    ngOnInit() {
    }

    public listStates(): Array<State> {
        return this.coronaService.getStates();
    }

    onStateChanged() {
        const df = this.coronaService.getStateData(this.state.state);
        this.displayState(df);
    }

    private displayState(df: DataFrame) {
        console.log();
    }
}

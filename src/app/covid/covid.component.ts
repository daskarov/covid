import { Component, OnInit } from '@angular/core';
import { DataFrame } from 'dataframe-js';
import { CovidService, State } from './covid.service';

@Component({
    selector: 'app-corona',
    templateUrl: './covid.component.html',
    styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

    state = null;

    constructor(private coronaService: CovidService) {
    }

    ngOnInit() {
    }

    public listStates(): Array<State> {
        return this.coronaService.getStates();
    }

    onStateChanged() {
        const df = this.coronaService.getStateData(this.state);
        this.displayState(df);
    }

    private displayState(df: DataFrame) {
        console.log();
    }

    public lastUpdated() : string {
        return this.coronaService.getLatestDate();
    }

    public totalCases() : number {
        return this.coronaService.getTotalCases();
    }

    public currentCasesForState() : string {
        if (this.state === null) {
            return '';
        }
        const count = this.coronaService.getCountForState(this.state);
        return count > 0 ? count.toString() : '';
    }
}

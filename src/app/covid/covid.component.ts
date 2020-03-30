import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFrame } from 'dataframe-js';
import { CovidService, State } from './covid.service';

@Component({
    selector: 'app-covid',
    templateUrl: './covid.component.html',
    styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

    public static readonly DATE: string = 'date';
    public static readonly STATE: string = 'state';
    public static readonly FIPS: string = 'fips';
    public static readonly CASES: string = 'cases';
    public static readonly DEATHS: string = 'deaths';

    public state: State = null;
    public chartData: Array<Array<string>> = new Array<Array<string>>();

    @ViewChild('chart') private chartContainer: ElementRef;

    constructor(private covidService: CovidService) {
    }

    ngOnInit() {
    }

    public statesList(): Array<State> {
        return this.covidService.getStates();
    }

    onStateSelected() {
        const df = this.covidService.getStateData(this.state);
        this.displayState(df);
    }

    private displayState(df: DataFrame) {
        this.chartData = this.covidService.getColumns(df, [
            CovidComponent.DATE, CovidComponent.CASES, CovidComponent.DEATHS
        ]);
        console.log(`Count for ${this.state.state} = ${this.chartData.length}`);
    }

    public lastUpdated(): string {
        return this.covidService.getLatestDate();
    }

    public totalCases(): number {
        return this.covidService.getTotalCases();
    }

    casesForState(): string {
        return this.getLatestFieldForState(CovidComponent.CASES);
    }

    deathsForState(): string {
        return this.getLatestFieldForState(CovidComponent.DEATHS);
    }

    private getLatestFieldForState(field: string): string {
        if (this.state === null) {
            return '';
        }
        const count = this.covidService.getCountForState(this.state, field);
        return count > 0 ? count.toString() : '';
    }

    public getState(): string {
        return this.state != null ? this.state.state : '';
    }
}

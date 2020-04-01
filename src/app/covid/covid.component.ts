import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFrame } from 'dataframe-js';
import { CovidService, State, StateData } from './covid.service';

@Component({
    selector: 'app-covid',
    templateUrl: './covid.component.html',
    styleUrls: ['./covid.component.scss']
})
export class CovidComponent {

    public static readonly DATE: string = 'date';
    public static readonly STATE: string = 'state';
    public static readonly FIPS: string = 'fips';
    public static readonly CASES: string = 'cases';
    public static readonly DEATHS: string = 'deaths';

    public state: State = null;
    public chartData: Array<StateData> = new Array<StateData>();

    constructor(private covidService: CovidService) {
    }

    public statesList(): Array<State> {
        return this.covidService.getStates();
    }

    onStateSelected() {
        const df = this.covidService.getStateData(this.state);
        this.displayState(df);
    }

    private displayState(df: DataFrame) {
        const lists = this.covidService.getColumns(df, [
            CovidComponent.DATE, CovidComponent.CASES, CovidComponent.DEATHS
        ]);
        this.chartData = lists[0].map((item, index) => (
            {date: lists[0][index], cases: Number(lists[1][index]), deaths: Number(lists[2][index])}
        ));
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

    public totalDeaths(): number {
        return this.covidService.getTotalDeaths();
    }
}

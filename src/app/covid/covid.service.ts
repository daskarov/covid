import { Injectable } from '@angular/core';
import { DataFrame } from 'dataframe-js';

export interface State {
    state: string;
}

export interface StateData {
    date: string;
    cases: number;
    deaths: number;
}

@Injectable({
    providedIn: 'root'
})
export class CovidService {

    private srcUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';
    private df: DataFrame = null;
    private statesList: Array<State> = null;
    private latestDate: string = null;
    private totalCases: number = 0;
    private totalDeaths: number = 0;

    constructor() {
        this.loadCoronaData();
    }

    public getTotalCases(): number {
        return this.totalCases;
    }

    public getTotalDeaths(): number {
        return this.totalDeaths;
    }

    private loadCoronaData() {
        DataFrame.fromCSV(this.srcUrl).then(df => {
            this.df = df;
            this.readData();
        });
    }

    private readData() {
        this.readStates();
        this.countTotals();
        this.findLatestDate();
    }

    private findLatestDate() {
        this.latestDate = this.df.select('date').toArray().reduce((a, b) => {
            return a > b ? a : b;
        });
    }

    private readStates() {
        this.statesList = this.df.unique('state').toCollection();
        this.statesList.sort((a, b) => (b.state < a.state ? 1 : -1));
    }

    private countTotals() {
        this.statesList.forEach(state => {
            this.totalCases += this.getCountForState(state, 'cases');
            this.totalDeaths += this.getCountForState(state, 'deaths');
        });
    }

    public getStates(): Array<State> {
        return this.statesList;
    }

    getStateData(state: State): DataFrame {
        return this.df.where(row => ((row.get('state') === state.state) && (row.get('cases') >= 100)));
    }

    public getLatestDate(): string {
        if (this.df === null) {
            return '';
        }
        return this.latestDate[0];
    }

    public getCountForState(state: State, field: string): number {
        if (this.df === null || state.state.length === 0) {
            return -1;
        }
        const allStateData = this.df.where(row => row.get('state') === state.state);
        return Number(allStateData.getRow(allStateData.count() - 1).get(field));
    }

    public getColumns(df: DataFrame, fields: Array<string>): Array<Array<string>> {
        let elementList: Array<Array<string>> = new Array<Array<string>>();
        fields.forEach(field => {
            let items = df.select(field).toArray().map(x => x[0]);
            elementList.push(items);
        });
        return elementList;
    }
}

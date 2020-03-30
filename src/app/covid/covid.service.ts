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
    private latestDateList: DataFrame = null;

    constructor() {
        this.loadCoronaData();
    }

    private loadCoronaData() {
        DataFrame.fromCSV(this.srcUrl).then(df => {
            this.df = df;
            this.readData();
        });
    }

    private readData() {
        this.latestDate = this.df.select('date').toArray().reduce((a, b) => {
            return a > b ? a : b;
        });
        this.latestDateList = this.df.where(row =>
            row.get('date') === this.getLatestDate()
        );
    }

    public getStates(): Array<State> {
        if (this.df == null) {
            return new Array<State>();
        }
        if (this.statesList == null) {
            this.statesList = this.df.unique('state').toCollection();
            this.statesList.sort((a, b) => (b.state < a.state ? 1 : -1));
        }
        return this.statesList;
    }

    getStateData(state: State): DataFrame {
        return this.df.where(row => ((row.get('state') === state.state) && (row.get('cases') >= 10)));
    }

    public getLatestDate(): string {
        if (this.df === null) {
            return '';
        }
        return this.latestDate[0];
    }

    private getLatestList(): DataFrame {
        return this.latestDateList;
    }

    getTotalCases(): number {
        if (this.df === null) {
            return 0;
        }
        return this.getLatestList().stat.sum('cases');
    }

    public getCountForState(state: State, field: string): number {
        if (this.df === null || state.state.length === 0) {
            return -1;
        }
        const latestStateData = this.latestDateList.where(row => row.get('state') === state.state);
        return Number(latestStateData.getRow(0).get(field));
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

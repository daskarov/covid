import { Injectable } from '@angular/core';
import { DataFrame } from 'dataframe-js';

export interface State {
    state: string;
}

export interface StateData {
    state: string;
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
        const stateData: DataFrame = this.df.where(row => ((row.get('state') === state.state) && (row.get('cases') >= 10)));
        return stateData;
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

    public getCountForState(stateName: State): number {
        if (this.df === null || stateName.state.length === 0) {
            return -1;
        }
        const latestStateData = this.latestDateList.where(row => row.get('state') === stateName.state);
        return Number(latestStateData.getRow(0).get('cases'));
    }
}

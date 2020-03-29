import { Injectable } from '@angular/core';
import { DataFrame } from 'dataframe-js';

export interface State {
    state: string;
}

@Injectable({
    providedIn: 'root'
})
export class CoronaService {

    private srcUrl = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';
    private df: DataFrame = null;
    private statesList: Array<State> = null;

    constructor() {
        this.loadCoronaData();
    }

    private loadCoronaData() {
        DataFrame.fromCSV(this.srcUrl).then(df => {
            this.df = df;
        });
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

    getStateData(state: string) : DataFrame {
        const stateData = this.df.where({'state': state});
        return stateData.where(row => row.get('cases') >= 10);
    }
}

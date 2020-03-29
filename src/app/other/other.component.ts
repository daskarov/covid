import { Component, OnInit } from '@angular/core';

class StlElement {
    constructor(public re: RegExp, public tag: string) {
    }

    public id(): string {
        return this.tag;
    }

    public idFromUrl(url: string): string {
        const m = url.match(this.re);
        return this.idFromData(m.groups.side, Number(m.groups.sideIndex));
    }

    public idFromData(side: string, sideIndex: number) {
        return `${this.tag}_${side}_${sideIndex}`;
    }
}

interface ElectrodeModel {
    model: string;
    name: string;
    side: string;
    side_index: number;
}

export enum ElectrodeModels {
    // Use ElectrodeModelService.nameToElectrodeModel(name) to convert names to ElectrodeModels
    BSC_2201 = 'BSci',
    BSC_2202 = 'BSC_2202',
    MDT_3387 = 'MDT_3387',
    MDT_3389 = 'MDT_3389',
    SJM_6172 = 'SJM_6172',
    SJM_6173 = 'SJM_6173'
}

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.nameToElectrodeModel('MDT_3387');
        console.log();
    }

    public nameToElectrodeModel(name: string): ElectrodeModels {
        const names: Array<string> = Object.values(ElectrodeModels);
        const index = names.indexOf(name, 0);
        if (index === -1) {
            throw new Error(`Unknown electrode model ${name}`);
        }
        return ElectrodeModels[(Object.keys(ElectrodeModels))[index]];
    }
}

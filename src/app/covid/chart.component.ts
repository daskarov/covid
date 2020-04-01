import { Directive, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { StateData } from './covid.service';
import * as d3 from 'd3';

@Directive()
export abstract class ChartComponent implements OnInit, OnChanges {

    @ViewChild('chart', {static: true}) chartContainer: ElementRef;

    @Input() protected data: Array<StateData>;

    protected element: any = null;
    protected margin: any = {top: 40, bottom: 100, left: 75, right: 75};
    protected chart: any;
    protected width: number;
    protected height: number;
    protected xScale: any;
    protected yScale: any;
    protected colors: any;
    protected xAxis: any;
    protected yAxis: any;

    ngOnInit(): void {
    }

    ngOnChanges() {
        if (!this.chart && this.data.length > 0) {
            this.createChart();
        }
        this.updateChart();
    }

    protected readElementParams() {
        this.element = this.chartContainer.nativeElement;
        this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
    }

    protected abstract createChart(): void;

    protected abstract updateChart(): void;

    protected getMaxY(): number {
        let max = d3.max(this.data, d => d.cases);
        return (Math.floor(max / 20) + 1) * 20;
    }
}

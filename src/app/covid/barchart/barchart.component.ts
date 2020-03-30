import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { StateData } from '../covid.service';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {

    @ViewChild('chart', {static: true}) chartContainer: ElementRef;

    @Input() private data: Array<StateData>;

    private margin: any = {top: 40, bottom: 40, left: 50, right: 50};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    constructor() {
    }

    ngOnInit() {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        let svg = d3.select(element).append('svg').attr('width', element.offsetWidth).attr('height', element.offsetHeight);

        // chart plot area
        this.chart = svg.append('g').attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        let xDomain = this.data.map(d => d.date);
        let yMax = this.getMaxY();
        let yDomain = [0, yMax];

        // create scales
        this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        // bar colors
        this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]> ['blue', 'red']);

        // x & y axis
        this.xAxis = svg.append('g').attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));

        this.yAxis = svg.append('g').attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map(d => d.date));
        this.yScale.domain([0, this.getMaxY()]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        let update = this.chart.selectAll('.bar').data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', d => this.xScale(d.date))
            .attr('y', d => this.yScale(d.cases))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(d.cases))
            .style('fill', (d, i) => this.colors(i));

        // add new bars
        update.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d.date))
            .attr('y', d => this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (d, i) => this.colors(i))
            .transition()
            .delay((d, i) => i * 10)
            .attr('y', d => this.yScale(d.cases))
            .attr('height', d => this.height - this.yScale(d.cases));
    }

    private getMaxY(): number {
        let max = d3.max(this.data, d => d.cases);
        return (Math.floor(max / 20) + 1) * 20;
    }
}

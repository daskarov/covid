import { Component, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../chart.component';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent extends ChartComponent {

    protected createChart(): void {
        this.readElementParams();
        let svg = d3.select(this.element).append('svg')
            .attr('width', this.element.offsetWidth)
            .attr('height', this.element.offsetHeight);

        // chart plot area
        this.chart = svg.append('g').attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // create scales
        this.xScale = d3.scaleBand().padding(0.1);
        this.yScale = d3.scaleLinear();

        // bar colors
        this.colors = d3.scaleLinear().range(<any[]> ['blue', 'red']);

        // x & y axis
        this.xAxis = svg.append('g').attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));

        this.yAxis = svg.append('g').attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    protected updateChart(): void {
        // update scales & axis
        this.xScale.domain(this.data.map(d => d.date)).rangeRound([0, this.width]);
        this.yScale.domain(d3.extent(this.data.map(d => d.cases))).range([this.height, 0]);
        this.colors.domain([0, this.data.length]);

        this.xAxis.transition().call(d3.axisBottom(this.xScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-90)');
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
            .attr('y', this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (d, i) => this.colors(i))
            .transition()
            .delay((d, i) => i * 10)
            .attr('y', d => this.yScale(d.cases))
            .attr('height', d => this.height - this.yScale(d.cases));

    }
}

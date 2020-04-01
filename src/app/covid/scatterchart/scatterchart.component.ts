import { Component } from '@angular/core';
import { ChartComponent } from '../chart.component';

@Component({
    selector: 'app-scatterchart',
    templateUrl: './scatterchart.component.html',
    styleUrls: ['./scatterchart.component.scss']
})
export class ScatterChartComponent extends ChartComponent {

    protected createChart(): void {
    }

    protected updateChart(): void {
    }
}

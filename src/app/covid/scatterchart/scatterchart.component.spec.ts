import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterChartComponent } from './scatterchart.component';

describe('ScatterchartComponent', () => {
    let component: ScatterChartComponent;
    let fixture: ComponentFixture<ScatterChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScatterChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScatterChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidComponent } from './covid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CoronaComponent', () => {
    let component: CovidComponent;
    let fixture: ComponentFixture<CovidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatSelectModule,
                BrowserAnimationsModule
            ],
            declarations: [
                CovidComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CovidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

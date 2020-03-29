import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ThreeComponent } from './three.component';
import { MatCardModule } from '@angular/material/card';

describe('ThreeComponent', () => {
    let component: ThreeComponent;
    let fixture: ComponentFixture<ThreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                MatCardModule
            ],
            declarations: [
                ThreeComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
    @ViewChild('containerDiv', {static: true}) theDiv: ElementRef;

    width: number;
    height: number;
    aspectRatio: number;

    constructor() {
    }

    ngOnInit() {
        this.setSizeOfView();
    }

    onResize() {
        this.setSizeOfView();
    }

    private setSizeOfView() {
        this.height = this.theDiv.nativeElement.offsetHeight - 40;
        this.width = this.theDiv.nativeElement.offsetWidth - 40;
        this.aspectRatio = this.width / this.height;
    }
}

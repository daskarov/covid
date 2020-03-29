import { Routes } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ThreeComponent } from './three/three.component';
import { OtherComponent } from './other/other.component';
import { CoronaComponent } from './corona/corona.component';

export const appRoutes: Routes = [
    {
        path: 'three',
        component: ThreeComponent,
    },
    {
        path: 'dynamic',
        component: DynamicComponent,
    },
    {
        path: 'other',
        component: OtherComponent,
    },
    {
        path: 'corona',
        component: CoronaComponent,
    },
];

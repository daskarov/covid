import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatSliderModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ThreeComponent } from './three/three.component';
import { OtherComponent } from './other/other.component';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { CoronaComponent } from './corona/corona.component';

@NgModule({
    declarations: [
        AppComponent,
        DynamicComponent,
        ThreeComponent,
        OtherComponent,
        CoronaComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSliderModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

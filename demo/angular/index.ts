import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component } from "@angular/core";

import { data1, data2, data3 } from "../common";

@Component({
    selector: "app",
    template: `
    <div style="width: 500px;">
        <select2 [data]="data1"
            [value]="value1"
            (select)="select1($event)">
        </select2>
        selected value: {{value1}}
        <hr/>
        <select2 [data]="data2"
            [value]="value2"
            (select)="select2($event)">
        </select2>
        selected value: {{value2}}
        <hr/>
        <select2 [data]="data3"
            [value]="value3"
            (select)="select3($event)">
        </select2>
        selected value: {{value3}}
    </div>
    `,
})
export class MainComponent {
    data1 = data1;
    data2 = data2;
    data3 = data3;

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";

    select1(value: string) {
        this.value1 = value;
    }
    select2(value: string) {
        this.value2 = value;
    }
    select3(value: string) {
        this.value3 = value;
    }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Select2Component } from "../../dist/angular";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [MainComponent, Select2Component],
    bootstrap: [MainComponent],
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);

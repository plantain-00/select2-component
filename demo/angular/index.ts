import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

enableProdMode();

import { Component } from "@angular/core";

import { data1, data2, data3, data5 } from "../common";

@Component({
    selector: "app",
    template: `
    <div style="width: 500px;">
        <h3>options in group({{value1}})</h3>
        <select2 [data]="data1"
            [value]="value1"
            (update)="update1($event)">
        </select2>
        <h3>options ({{value2}})</h3>
        <select2 [data]="data2"
            [value]="value2"
            (update)="update2($event)">
        </select2>
        <h3>less options ({{value3}})</h3>
        <select2 [data]="data3"
            [value]="value3"
            (update)="update3($event)">
        </select2>
        <h3>disabled ({{value4}})</h3>
        <select2 [data]="data4"
            [value]="value4"
            [disabled]="true">
        </select2>
        <h3>hide search box ({{value5}})</h3>
        <select2 [data]="data5"
            [value]="value5"
            [minCountForSearch]="Infinity"
            (update)="update5($event)">
        </select2>
    </div>
    `,
})
export class MainComponent {
    data1 = data1;
    data2 = data2;
    data3 = data3;
    data4 = JSON.parse(JSON.stringify(data3));
    data5 = data5;

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";
    value5 = "foo3";

    update1(value: string) {
        this.value1 = value;
    }
    update2(value: string) {
        this.value2 = value;
    }
    update3(value: string) {
        this.value3 = value;
    }
    update5(value: string) {
        this.value5 = value;
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

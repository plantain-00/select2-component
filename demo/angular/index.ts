import "core-js/es6";
import "core-js/es7/reflect";
import "zone.js/dist/zone";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import * as common from "../../dist/common";

enableProdMode();

import { Component } from "@angular/core";

import { data1, data2, data3, data5 } from "../common";

@Component({
    selector: "app",
    template: `
    <div style="width: 500px;">
        <a href="https://github.com/plantain-00/select2-component/tree/master/demo/angular/index.ts" target="_blank">the source code of the demo</a>
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
            [minCountForSearch]="minCountForSearch"
            (update)="update5($event)">
        </select2>
        <h3>placeholder ({{value6}})</h3>
        <select2 [data]="data6"
            placeholder="select an item"
            (update)="update6($event)">
        </select2>
        <h3>open and search event ({{value7}})</h3>
        <select2 [data]="data7"
            customSearchEnabled="true"
            (open)="open7()"
            (search)="search7($event)"
            (update)="update7($event)">
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
    data6 = JSON.parse(JSON.stringify(data3));
    data7: common.Select2Option[] = [];

    minCountForSearch = Infinity;

    value1 = "CA";
    value2 = "CA";
    value3 = "foo";
    value4 = "bar";
    value5 = "foo3";
    value6 = "";
    value7 = "";

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
    update6(value: string) {
        this.value6 = value;
    }
    open7() {
        this.data7 = JSON.parse(JSON.stringify(data2));
    }
    update7(value: string) {
        this.value7 = value;
    }
    search7(text: string) {
        this.data7 = text
            ? (JSON.parse(JSON.stringify(data2)) as common.Select2Option[]).filter(option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1)
            : JSON.parse(JSON.stringify(data2));
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

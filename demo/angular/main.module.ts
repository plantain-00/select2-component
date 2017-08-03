import { NgModule, ApplicationRef } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { Select2Module } from "../../dist/angular";
import { MainComponent } from "./main";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Select2Module
    ],
    bootstrap: [MainComponent]
})
export class MainModule {
    constructor(
        public appRef: ApplicationRef
    ) { }
}
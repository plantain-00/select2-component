import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Select2, Select2Hint } from "./index.component";

/**
 * @public
 */
@NgModule({
    declarations: [
        Select2Hint,
        Select2,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        Select2Hint,
        Select2,
    ],
})
export class Select2Module { }

export * from "./index.component";
export * from "select2-component";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Select2, Select2Hint } from './angular';

@NgModule({
    declarations: [
        Select2Hint,
        Select2
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Select2Hint,
        Select2
    ]
})
export class Select2Module { }

export * from './angular';
export * from './common';

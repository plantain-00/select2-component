import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Select2 } from './angular';

@NgModule({
    imports: [CommonModule],
    exports: [Select2],
    declarations: [Select2],
})
export class Select2Module { }

export * from './angular';

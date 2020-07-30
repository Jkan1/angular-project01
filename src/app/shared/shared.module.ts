import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { AppPlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropdownDirective } from './dropdown.directive';
import { ItemPointerDirective } from './item-pointer.directive';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        AppPlaceholderDirective,
        DropdownDirective,
        ItemPointerDirective
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        AppPlaceholderDirective,
        DropdownDirective,
        ItemPointerDirective,
        CommonModule
    ]
})
export class SharedModule { }
import { HostBinding, Directive } from '@angular/core';

@Directive({
    selector: "[itemPointer]",
})
export class ItemPointerDirective {

    @HostBinding('style.cursor') cursor: string = 'pointer';

    constructor() { }

}
import {Component} from '@angular/core';

// <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

@Component({
    selector:"loading-spinner",
    template:`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`,
    styleUrls:["./loading.spinner.component.css"]
})
export class LoadingSpinnerComponent { }
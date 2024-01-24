import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.style.css']
})

export class FooterComponent {

    constructor(private store: Store<AppState>) { }

}

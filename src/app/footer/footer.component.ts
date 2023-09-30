import { Component } from "@angular/core";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from '../auth/store/auth.actions';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.style.css']
})

export class FooterComponent {

    constructor(private store: Store<AppState>) { }

}

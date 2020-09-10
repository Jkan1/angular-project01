import { NgModule } from '@angular/core';

import { AuthComponent } from "./auth.component";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        AuthComponent,
        VerifyComponent,
        UserComponent
    ],
    imports: [
        SharedModule, 
        FormsModule,
        RouterModule.forChild([{ path: "auth", component: AuthComponent }])
    ],
    exports: [],
    providers: [],
})
export class AuthModule { }

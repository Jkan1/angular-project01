import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

@Injectable({ providedIn: "root" })
export class VerifyGuard  {

    constructor(private router: Router, private store: Store<AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
        : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(take(1),
        map((authState) => {
            return authState.user;
        }),
        map(
            (data) => { 
                if(data && data.emailVerified){
                    return true;
                }
                return this.router.createUrlTree(['/user']);
            }
        ));
    }

}
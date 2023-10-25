import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { VerifyStart } from '../store/auth.actions';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  isLoading = true;
  errorMessage: string;
  successMessage: string;

  constructor(private activeRoute: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (!params || !params.mode || !params.oobCode || params.oobCode.length < 8) {
        this.isLoading = false;
        this.errorMessage = "Sorry, unable to verify your identity.\nPlease try after some time";
      } else {
        this.store.select('auth').subscribe((state) => {
          if (!state || !state.user) {
            this.isLoading = false;
            this.errorMessage = "Sorry, please login to your account first.\n\nRedirecting to login ...";
            setTimeout(()=>{
              this.router.navigate(['/auth']);
            },6000)
          } else {
            if (state.user.emailVerified) {
              this.isLoading = false;
              this.successMessage = "Verification successful!\n\nRedirecting to home ...";
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
            } else {
              if (state.authError || state.loading) {
                this.isLoading = state.loading;
                this.errorMessage = state.authError;
              } else {
                this.store.dispatch(new VerifyStart({ oobToken: params.oobCode }));
              }
            }
          }
        });
      }
    });
  }

}

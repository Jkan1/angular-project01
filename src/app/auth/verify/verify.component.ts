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
        this.errorMessage = "Sorry, We were Unable to verify your Identity.\n Please try after some time";
      } else {
        this.store.select('auth').subscribe((state) => {
          if (!state || !state.user) {
            this.isLoading = false;
            this.errorMessage = "Sorry, Please Sign Into your account first";
          } else {
            if (state.user.emailVerified) {
              this.isLoading = false;
              this.successMessage = "Verification Successful\n\nRedirecting in 5 seconds";
              setTimeout(()=>{
                this.router.navigate(['/']);
              },5000)
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SendEmailStart } from '../store/auth.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  user: User;
  isVerified = false;
  private authSubscription: Subscription;
  buttonTimer: number;
  private timerInterval;
  editMode = false;
  sampleImage: string = environment.sampleProfileImage

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .pipe(
        map((authState) => {
          this.buttonTimer = parseInt(localStorage.getItem('EMAIL_ATTEMPT_TIMER')) || 0;
          return authState.user;
        }))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.isVerified = user.emailVerified || false;
        }
      });
    if (this.buttonTimer != 0) {
      this.setupSendEmailTimer();
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSendEmail() {
    if (this.buttonTimer != 0) {
      return;
    }
    this.buttonTimer = 20;
    localStorage.setItem('EMAIL_ATTEMPT_TIMER', this.buttonTimer.toString());
    this.store.dispatch(new SendEmailStart({ idToken: this.user.token }));
    this.setupSendEmailTimer();
  }

  setupSendEmailTimer() {
    this.timerInterval = setInterval(() => {
      this.buttonTimer = parseInt(localStorage.getItem('EMAIL_ATTEMPT_TIMER'));
      if (this.buttonTimer > 1) {
        this.buttonTimer--;
        localStorage.setItem('EMAIL_ATTEMPT_TIMER', this.buttonTimer.toString());
      } else {
        this.buttonTimer = 0;
        localStorage.setItem('EMAIL_ATTEMPT_TIMER', this.buttonTimer.toString());
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      }
    }, 1000);
  }

  onSwitchMode() {
      this.editMode = !this.editMode;
  }

}

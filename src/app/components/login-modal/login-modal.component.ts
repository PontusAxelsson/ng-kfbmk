import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GoogleLoginButtonComponent } from '../google-login-button/google-login-button.component';
import { EmailLoginButtonComponent } from '../email-login-button/email-login-button.component';
import { EmailLoginComponent } from '../email-login/email-login.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    GoogleLoginButtonComponent,
    EmailLoginButtonComponent,
    EmailLoginComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  userService = inject(UserService);
  showEmailLogin = signal(false);
  clickGoogleLoginBtn() {
    console.log('Google login');
    this.userService.signInGoogle();
  }
  clickMailLoginBtn() {
    console.log('Email login');
    this.showEmailLogin.set(true);
  }
}

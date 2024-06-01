import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { GoogleLoginButtonComponent } from '../buttons/google-login-button/google-login-button.component';
import { EmailLoginButtonComponent } from '../buttons/email-login-button/email-login-button.component';
import { EmailLoginComponent } from '../email-login/email-login.component';
import { UserService } from '../../services/user.service';
import { CloseButtonComponent } from '../buttons/close-button/close-button.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    GoogleLoginButtonComponent,
    EmailLoginButtonComponent,
    EmailLoginComponent,
    CloseButtonComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  dialog = inject(Dialog);

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

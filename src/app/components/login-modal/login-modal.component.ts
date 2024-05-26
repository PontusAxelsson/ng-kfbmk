import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoogleLoginButtonComponent } from '../google-login-button/google-login-button.component';
import { EmailLoginButtonComponent } from '../email-login-button/email-login-button.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [GoogleLoginButtonComponent, EmailLoginButtonComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {}

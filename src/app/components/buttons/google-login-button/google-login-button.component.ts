import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-google-login-button',
  standalone: true,
  imports: [],
  templateUrl: './google-login-button.component.html',
  styleUrl: './google-login-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleLoginButtonComponent {}

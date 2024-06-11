import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignInButtonComponent } from '../buttons/sign-in-button/sign-in-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SignInButtonComponent, LoginModalComponent],
  providers: [DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

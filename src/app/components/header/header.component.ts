import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignInButtonComponent } from '../sign-in-button/sign-in-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SignInButtonComponent, LoginModalComponent],
  providers: [DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly dialog = inject(Dialog);

  openLoginModal() {
    this.dialog.open(LoginModalComponent, {
      minWidth: '300px',
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogModule, Dialog } from '@angular/cdk/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  providers: [DialogModule, LoginModalComponent],
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

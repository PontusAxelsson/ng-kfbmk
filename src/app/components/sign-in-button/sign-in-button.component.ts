import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInButtonComponent {
  @Input() user: User | null = null;

  signMeOut() {
    console.log('signing out');
  }
}

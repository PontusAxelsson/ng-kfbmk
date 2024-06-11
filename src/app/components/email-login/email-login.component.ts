import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-login.component.html',
  styleUrl: './email-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLoginComponent {
  userService = inject(UserService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.signInEmail({
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    });
  }
}

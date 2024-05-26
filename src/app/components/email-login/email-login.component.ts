import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-login.component.html',
  styleUrl: './email-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    console.log('Email login');
  }
}

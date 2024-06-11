import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Dialog } from '@angular/cdk/dialog';
import { LoginModalComponent } from '../../login-modal/login-modal.component';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { UserStore } from '../../../store/user.store';

@Component({
  selector: 'app-sign-in-button',
  standalone: true,
  imports: [LoginModalComponent, AsyncPipe],
  templateUrl: './sign-in-button.component.html',
  styleUrl: './sign-in-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInButtonComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(Dialog);
  private readonly userService = inject(UserService);
  private readonly userStore = inject(UserStore);

  destroyMe$ = new Subject();

  user$ = this.userService.user();

  signMeOut() {
    this.userService.signOut();
    this.userStore.load();
  }

  signMeIn() {
    this.dialog.open(LoginModalComponent, {
      minWidth: '300px',
    });
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroyMe$)).subscribe(() => {
      this.dialog.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.destroyMe$.next(1);
    this.destroyMe$.complete();
  }
}

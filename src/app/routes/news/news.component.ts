import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';
import { NewsStore } from '../../store/news.store';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [TextWrapperComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
  store = inject(NewsStore);
  userStore = inject(UserStore);
  user = this.userStore.user;

  viewportScroller = inject(ViewportScroller);
  showNumNews = this.store.limiter;

  showNumNewsChanged() {
    this.store.loadAll(this.store.limiter() + 2);
  }

  ngOnInit() {
    this.store.loadAll(this.store.limiter());
  }
}

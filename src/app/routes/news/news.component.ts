import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';
import { NewsStore } from '../../store/news.store';

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
  viewportScroller = inject(ViewportScroller);
  showNumNews = computed(() => this.store.limiter);

  showNumNewsChanged() {
    this.store.loadAll(this.store.limiter() + 2);
  }

  ngOnInit() {
    this.store.loadAll(this.store.limiter());
  }
}

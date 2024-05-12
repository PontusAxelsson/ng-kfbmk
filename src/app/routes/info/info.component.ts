import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';
import { TrainingGroupStore } from '../../store/traning-groups.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TextWrapperComponent, JsonPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  readonly store = inject(TrainingGroupStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}

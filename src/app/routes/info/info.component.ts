import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { TextWrapperComponent } from '../../components/text-wrapper/text-wrapper.component';
import { TrainingGroupStore } from '../../store/traning-groups.store';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TextWrapperComponent, JsonPipe, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {
  store = inject(TrainingGroupStore);

  thisYear = new Date().getFullYear();
  nextYear = new Date().getFullYear() + 1;

  beginner = computed(() => this.store.trainingGroups()[0]);
  intermediate = computed(() => this.store.trainingGroups()[1]);
  seniors = computed(() => this.store.trainingGroups()[2]);

  ngOnInit(): void {
    this.store.loadAll();
  }
}

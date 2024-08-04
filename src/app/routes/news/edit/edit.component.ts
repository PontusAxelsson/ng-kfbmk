import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  EditorConfig,
} from 'ckeditor5';
import { TextWrapperComponent } from '../../../components/text-wrapper/text-wrapper.component';
import { LoadingSpinnerComponent } from '../../../components/loading-spinner/loading-spinner.component';
import { NewsStore } from '../../../store/news.store';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule,
    CKEditorModule,
    TextWrapperComponent,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnDestroy, OnInit {
  destroyMe$ = new Subject<number>();
  activatedRoute = inject(ActivatedRoute);
  store = inject(NewsStore);

  uuid = this.activatedRoute.snapshot.params['uuid'];
  count = 0;
  newsItem = computed(() => this.store.entities().get(this.uuid));
  loading = signal(false);

  classicEditor = ClassicEditor;

  config: EditorConfig = {
    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
  };

  newsForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    text: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  ngOnInit() {
    if (!this.newsItem()) {
      this.store.loadById(this.uuid);
    }
  }

  onContentChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.newsForm.get('text')?.setValue(data);
  }

  submitNews(e: SubmitEvent) {
    e.preventDefault();
    if (this.newsForm.invalid) return;
    this.store.update({
      docName: this.newsItem()!.docName,
      news: {
        content: this.newsForm.value.text!,
        title: this.newsForm.value.title!,
        uuid: this.uuid,
      },
    });
  }

  ngOnDestroy() {
    this.destroyMe$.next(1);
    this.destroyMe$.complete();
  }
}

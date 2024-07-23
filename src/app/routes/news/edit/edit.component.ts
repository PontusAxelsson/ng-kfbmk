import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule,
    CKEditorModule,
    TextWrapperComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  private activatedRoute = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  uuid$ = this.activatedRoute.params.pipe(filter((params) => params['uuid']));
  loading = signal(false);

  classicEditor = ClassicEditor;

  config: EditorConfig = {
    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
  };

  newsForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });
}

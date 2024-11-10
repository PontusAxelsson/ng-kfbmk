import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { News, NewsStore } from '../../../store/news.store';
import { UserService } from '../../../services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
  templateUrl: './add.component.html',
  styleUrl: '../edit/edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
  newsStore = inject(NewsStore);
  userService = inject(UserService);
  router = inject(Router);
  newsItem = signal<News | undefined>(undefined);

  loading = signal(false);
  user = toSignal(this.userService.user());

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

  onContentChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.newsForm.get('text')?.setValue(data);
  }

  submitNews(e: SubmitEvent) {
    e.preventDefault();
    if (this.newsForm.invalid) return;
    this.newsStore.add({
      news: {
        content: this.newsForm.value.text!,
        title: this.newsForm.value.title!,
      },
      user: this.user(),
    });
    this.router.navigate(['news']);
  }
}

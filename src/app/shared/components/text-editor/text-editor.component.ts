import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as DecoupledEditor from '@custom-ckeditor';

@Component({
  selector: 'text-editor',
  template: `
    <ckeditor
      class="ant-input"
      [config]="configEditor"
      [editor]="Editor"
      (change)="onChange($event.editor.data.get() || '')"
      (ready)="onReady($event)"
    >
    </ckeditor>
  `,
  styles: [
    `
      :host.readOnly ::ng-deep .ck.ck-toolbar {
        display: none;
      }
      ckeditor {
        padding: 0;
      }
      :host ckeditor ::ng-deep .ck.ck-content.ck-editor__editable {
        min-height: 250px;
      }
    `,
  ],
  imports: [CKEditorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextEditor,
    },
  ],
  host: { '[class.readOnly]': 'readOnly' },
})
export class TextEditor implements OnInit, ControlValueAccessor {
  @Input() readOnly = false;
  @Input() placeholder = 'Введите текст...';

  value: string = '';

  onChange = (value: any) => {};
  onTouched = () => {};
  onValidatorChange = () => {};

  Editor: any = DecoupledEditor;
  configEditor = {
    placeholder: '',
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'outdent',
        'indent',
        '|',
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'inserttable',
        // 'mediaembed',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'underline',
        'strikethrough',
        '|',
        'furigana',
      ],
    },
    shouldNotGroupWhenFull: true,
    language: 'ru',
  };

  ngOnInit(): void {
    this.configEditor = { ...this.configEditor, placeholder: this.placeholder };
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  setDisabledState?(readOnly: boolean): void {
    this.readOnly = readOnly;
  }

  public onReady(editor: any) {
    setTimeout(
      () => (
        editor?.ui
          ?.getEditableElement()
          ?.parentElement?.insertBefore(editor?.ui?.view?.toolbar?.element, editor?.ui?.getEditableElement()),
        this.readOnly ? editor?.enableReadOnlyMode('') : editor?.disableReadOnlyMode(''),
        this.value && editor.data.set(this.value)
      ),
      200,
    );
  }
}

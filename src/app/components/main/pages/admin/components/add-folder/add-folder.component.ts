import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
  ],
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.less'],

})
export class AddFolderComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private readonly _uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      folderName: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    this._uploadService
      .addFolder(this.validateForm.value.folderName)
      .subscribe((e) => console.log(e));
  }
}

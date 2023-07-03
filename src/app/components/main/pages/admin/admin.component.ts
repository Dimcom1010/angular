import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from 'src/app/services/photos.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UploadComponent } from './components/upload/upload.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { UploadService } from 'src/app/services/upload.service';

interface PhotoCollapse {
  active: boolean;
  name: string;
  disabled: boolean;
}
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCollapseModule,
    UploadComponent,
    NzIconModule,
  ],
  providers: [NzModalService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  photosData: any = [];
  data: PhotoCollapse[] = [];
  private modal: NzModalService = inject(NzModalService);
  constructor(
    private readonly _photosService: PhotoService,
    private readonly _uploadService: UploadService
  ) {}

  async ngOnInit(): Promise<void> {
    this.photosData = await this._photosService.getAllCollectionsPromise();
    this.data = this.photosData.map((e: string) => {
      return {
        active: false,
        disabled: false,
        name: e,
      };
    });
  }
  addFolder() {
    this.modal.create({
      nzTitle: 'Создание новой папки',
      nzContent: AddFolderComponent,
      nzWidth: 350,

      nzOnOk: () => console.log("всё"),
      nzOkText: 'Закрыть',
      nzCancelText: null,
    });
  }

  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: `Удалить папку <b> ${id}?</b> `,
      nzContent: `<b>${id} будет удалина безвозвратно</b>`,
      nzOkText: 'Да',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delFolder(id),
      nzCancelText: 'Нет',
    });
  }
  delFolder(id: any) {
    this._uploadService.delFolder(id).subscribe((e) => console.log(e));
  }
}

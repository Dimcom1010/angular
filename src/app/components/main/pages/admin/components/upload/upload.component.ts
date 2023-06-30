import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from 'src/app/services/photos.service';
import { from, map, Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent implements OnInit {
  @Input() folderName: string | undefined;
  @Input() isOpen: boolean | undefined;

  upLoadURL: string = '';

  dataPhotosInFolder: NzUploadFile[] = [];

  constructor(private readonly _photoService: PhotoService) {}

  async ngOnInit(): Promise<void> {
    this.upLoadURL = `http://localhost:3000/api/upload?folderName=${this.folderName}`;
    this.getData();
  }
  handleUpload(event: any): void {
    if (event?.file?.status === 'done') {
      this.getData();
      console.log('Файлы успешно загружены');
    }
  }
  async getData() {
    const res: any = await this._photoService.getCollectionPromise(
      this.folderName
    );
    this.dataPhotosInFolder = res.map((e: string, index: number) => {
      return {
        uid: -index,
        name: e,
        status: 'done',
        url: `./assets/img/photos/collections/${this.folderName}/${e}`,
        thumbUrl: `./assets/img/photos/collections/${this.folderName}/${e}`,
      };
    });
  }
}

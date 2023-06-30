import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent {
  upLoadURL: string = `http://localhost:3000/api/upload?collectin=9998`;

  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'X1.jpg',
      status: 'done',
      url: './assets/img/photos/collections/Colection_1/1.jpg',
      thumbUrl: './assets/img/photos/collections/Colection_1/1.jpg',
    },
    {
      uid: '-2',
      name: 'X2.jpg',
      status: 'done',
      url: './assets/img/photos/collections/Colection_1/2.jpg',
      thumbUrl: './assets/img/photos/collections/Colection_1/2.jpg',
    },
    {
      uid: '-3',
      name: 'X3.jpg',
      status: 'done',
      url: './assets/img/photos/collections/Colection_1/3.jpg',
      thumbUrl: './assets/img/photos/collections/Colection_1/3.jpg',
    },
  ];
  fileList2 = [...this.defaultFileList];

  constructor(private readonly _http: HttpClient) {}

  handleUpload(event: any): void {
    console.log('размер файла:', Math.floor(+event.file.size / 1024));
    console.log('event', event.file);
    // if (event?.file.status === 'done') {
    //   // Загрузка успешно завершена - получение ответа от сервера
    //   this.downloadFile(event.file.response.filename);
    // }
  }
  downloadFile(filename: string): void {
    this._http
      .get(`http://localhost:3000/api/upload/${filename}`, {
        responseType: 'blob', // указываем бинарный тип ответа
      })
      .subscribe((response) => {
        saveAs(response, filename); // сохраняем файл на клиенте
      });
  }
}
function saveAs(response: Blob, filename: string) {
  console.log('созранить файл');

  throw new Error('Function not implemented.');
}

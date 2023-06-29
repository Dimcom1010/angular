import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from 'src/app/services/photos.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UploadComponent } from './components/upload/upload.component';

interface PhotoCollapse {
  active: boolean;
  name: string;
  disabled: boolean;
}
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCollapseModule, UploadComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  photosData: any = [];
  data: PhotoCollapse[] = [];

  constructor(private readonly _photosService: PhotoService) {}

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
}

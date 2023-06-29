import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from 'src/app/services/photos.service';
import { Observable } from 'rxjs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NzCollapseModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  photosData$ = new Observable<any>();
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1',
        },
      ],
    },
    {
      active: false,
      name: 'This is panel header 2',
    },
    {
      active: false,
      name: 'This is panel header 3',
    },
  ];
  constructor(private readonly _photosService: PhotoService) {}
  ngOnInit(): void {
    this.photosData$ = this._photosService.getAllCollections();
  }
}

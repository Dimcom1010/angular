import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../../services/photos.service';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, SliderComponent],
})
export class PortfolioComponent implements OnInit {
  photosData$: Observable<any> | undefined;
  constructor(
    private router: Router,
    private readonly _photosService: PhotoService
  ) {}
  ngOnInit(): void {
    this.photosData$ = this._photosService.getAllCollections();
  }
  openSlider(collectionName: string) {
    this.router.navigate([`collection`], { queryParams: { collectionName } });
  }
}

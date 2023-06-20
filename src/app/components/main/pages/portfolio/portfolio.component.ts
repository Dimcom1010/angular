import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetFotosService } from './services/get-fotos.service';
import { HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less'],
  standalone: true,
  imports: [CommonModule, HttpClientModule,SliderComponent],
})
export class PortfolioComponent implements OnInit {
  isOpenSlider$=new BehaviorSubject<boolean>(false)
  selectedPhotoID$=new BehaviorSubject<number>(1)
  isLoading:boolean=false;

  photos: any;

  constructor(private _fotoService: GetFotosService) {}
   ngOnInit(): void {
    this.photos = this._fotoService.getFotos();

  }
  openSlider(id:number){
    console.log('test',id);
    this.isOpenSlider$.next(true);
    this.selectedPhotoID$.next(id);
  }
  closeSlider(){
    this.isOpenSlider$.next(false)
  }


}

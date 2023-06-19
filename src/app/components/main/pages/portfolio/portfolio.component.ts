import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetFotosService } from './services/get-fotos.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class PortfolioComponent implements OnInit {
  isLoading:boolean=false;
  photos: any;
  f$: any;
  constructor(private _fotoService: GetFotosService) {}
   ngOnInit(): void {
    this.photos = this._fotoService.getFotos();

  }
  show(id:number){
    console.log('test',id)
  }
}

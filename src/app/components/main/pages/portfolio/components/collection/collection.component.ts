import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { GetFotosService } from '../../services/get-fotos.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.less'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true } }
  ]
})
export class CollectionComponent implements OnInit {

  photos$:Observable<any> | undefined;
  constructor(private route: ActivatedRoute,private readonly fotosService: GetFotosService) {}
  ngOnInit() {
    this.photos$=this.route.queryParams.pipe(
      switchMap(m=> {
        const collectionName=m['collectionName']
        return this.fotosService.getCollections(collectionName).pipe(map(e=>{return{folder:collectionName,data:e}}))})
      );
  }
}

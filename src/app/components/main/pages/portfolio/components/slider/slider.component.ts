import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
})
export class SliderComponent implements OnInit {

  @Input() photoId!: number;
  @Output() closeSlider = new EventEmitter<void>();


  ngOnInit(): void {
    console.log('ngOnInit', this.photoId);
  }


  back() {
    this.closeSlider.emit();
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,

} from '@angular/animations';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less'],
  animations: [
    trigger('resize', [
      state('small', style({
        height: '100px',
        width: '100px'
      })),
      state('large', style({
        height: '200px',
        width: '200px'
      })),
      transition('small <=> large', animate('200ms ease-out'))
    ])
  ]
})
export class NoticeComponent implements OnChanges {
  @Input() number!: String;

  isNewChanges:boolean=false
  toggle() {
    this.isNewChanges = !this.isNewChanges;
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['number']) {

      const newInfo = changes?.['number'].currentValue;
      console.log('info updated:', newInfo);
    }
  }

}

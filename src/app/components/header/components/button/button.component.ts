import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})

export class ButtonComponent {
  @Input() name?: string;
  @Input() link?: string;

}

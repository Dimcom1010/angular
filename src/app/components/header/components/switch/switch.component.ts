import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSwitchModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less'],
})
export class SwitchComponent {
  switchValue = false;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SwitchComponent } from './components/switch/switch.component';
import { LogoComponent } from './components/logo/logo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: true,
  imports: [CommonModule, NzButtonModule, SwitchComponent, LogoComponent],
})
export class HeaderComponent {}

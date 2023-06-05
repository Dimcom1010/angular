import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { Themes, ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSwitchModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less'],
})
export class SwitchComponent implements OnInit, AfterViewInit {
  switchValue = false;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  clickSwitch() {
    this.switchValue
      ? this.themeService.switchTheme(Themes.LIGHT)
      : this.themeService.switchTheme(Themes.DARK);
  }
}

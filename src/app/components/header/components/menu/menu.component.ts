import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  isActive$ = new BehaviorSubject<boolean>(false);
  menuTrigger() {
    this.isActive$.next(!this.isActive$.value);
    console.log(this.isActive$.value);
  }
}

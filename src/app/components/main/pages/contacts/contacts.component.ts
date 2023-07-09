import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerMenuButtonComponent } from 'src/app/components/elements/burger-menu-button/burger-menu-button.component';
import { InputComponent } from 'src/app/components/elements/input/input.component';
import { ButtonComponent } from 'src/app/components/elements/button/button.component';
import { NoticeComponent } from 'src/app/components/elements/notice/notice.component';

@Component({
  selector: 'app-contacts',

  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    BurgerMenuButtonComponent,
    InputComponent,
    ButtonComponent,
    NoticeComponent,
  ],
})
export class ContactsComponent {
  a:string='1';
  test(){

    let newA= +this.a
    newA++
    this.a=newA.toString()


  }
}

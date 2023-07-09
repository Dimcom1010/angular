import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { CustomTableComponent } from './custom-table.component';
import { TemplateRowDirective } from './template-row.directive';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomTableComponent, TemplateRowDirective],
  imports: [
    CommonModule,
    FormsModule,
    NzEmptyModule,
    NzSpinModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
  ],
  exports: [CustomTableComponent, TemplateRowDirective],
})
export class CustomTableModule {}

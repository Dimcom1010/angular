import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY, catchError, finalize, take, takeUntil } from 'rxjs';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';

import { DestroyService, KanjiService } from '@shared/services';
import { RadicalResReq } from '@shared/models';
import { SelectRadicalsPipe } from './select-radicals.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';

type RadicalResReqExtended = RadicalResReq & { selected?: boolean };

@Component({
  selector: 'select-radicals',
  templateUrl: './select-radicals.component.html',
  styleUrls: ['./select-radicals.component.less'],
  imports: [CommonModule, SelectRadicalsPipe, NzIconModule, NzInputModule, FormsModule, NzDropDownModule, NzCardModule],
  providers: [
    DestroyService,
    NzMessageService,
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: SelectRadicals },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SelectRadicals implements OnInit, ControlValueAccessor {
  isLoading = signal(false);
  disabled = signal(false);
  radicals = signal<RadicalResReqExtended[]>([]);

  selected: RadicalResReqExtended[] = [];

  onChange = (value: any) => {};
  onTouched = () => {};
  onValidatorChange = () => {};

  private readonly service = inject(KanjiService);
  private readonly msg = inject(NzMessageService);
  private readonly destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.loadRadicals();
  }

  clearAll() {
    this.radicals().forEach((e) => (e.selected = false));
    this.changeSelected();
  }

  changeSelected() {
    this.selected = this.radicals().filter((e) => e.selected);
    this.onChange(this.selected);
  }

  writeValue(value: RadicalResReqExtended[]): void {
    this.selected = value;
    const ids = value.map((e) => e.id);
    this.radicals().forEach((e) => ids.includes(e.id) && (e.selected = true));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  private async loadRadicals() {
    this.isLoading.set(true);
    this.service
      .getRadicals({ pageIndex: 1, pageSize: 1000000 })
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        catchError((error) => (this.msg.error(error?.error ?? error?.message ?? error), EMPTY)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((data) => this.radicals.set(this.sortRadicals(data?.nodes ?? [])));
  }

  private sortRadicals(list: RadicalResReqExtended[]): RadicalResReqExtended[] {
    if (this.selected.length) {
      const ids = this.selected.map((e) => e.id);
      list.forEach((e) => ids.includes(e.id) && (e.selected = true));
    }
    return list.sort((a, b) => {
      return a.count_traits === b.count_traits ? (a.id ?? 0) - (b.id ?? 0) : a.count_traits - b.count_traits;
    });
  }
}

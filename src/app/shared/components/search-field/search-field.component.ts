import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  filter,
  finalize,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { DestroyService } from '@shared/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export type SearchParamType = { search: string; pageIndex: number; pageSize: number };
export type SerachReturnType = { label: string; value: string | number };
export type SerachReturnListType = Observable<SerachReturnType[]>;

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.less'],
  imports: [CommonModule, NzSelectModule, NzIconModule, FormsModule, ReactiveFormsModule],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchField implements OnInit {
  @Input() placeholder: string = '';
  @Input() loadFn!: (param: SearchParamType) => SerachReturnListType;

  @Output() selected = new EventEmitter<SerachReturnType>();

  isLoading = signal(false);
  list = signal<SerachReturnType[]>([]);
  pageIndex = signal(1);
  openDropdown = signal(false);
  selectedFormItem = signal<any>(null);

  searchChange$ = new BehaviorSubject('');

  private readonly destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.searchChange$
      .pipe(
        tap(() => this.isLoading.set(true)),
        debounceTime(500),
        filter(() => this.openDropdown()),
        switchMap((search) => this.loadFn({ search, pageIndex: 1, pageSize: 50 })),
        takeUntil(this.destroy$),
        catchError((error) => (this.isLoading.set(false), [])),
      )
      .subscribe((e) => (this.isLoading.set(false), this.list.set(e), this.pageIndex.set(2)));
  }

  selectedItem(event: any) {
    const selected: SerachReturnType = event;
    this.selected.emit(selected);
    this.selectedFormItem.set(null);
    this.list.set([]);
    return false;
  }

  onSearch(value: string) {
    this.searchChange$.next(value);
  }

  scroll() {
    if (this.isLoading() || this.pageIndex() <= 0) {
      return;
    }
    this.isLoading.set(true);
    this.loadFn({ search: this.searchChange$.value, pageIndex: this.pageIndex(), pageSize: 50 })
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((e) => {
        if (e?.length) {
          this.list.mutate((list) => list.push(...e));
          this.pageIndex.update((count) => count + 1);
        } else {
          this.pageIndex.set(-1);
        }
      });
  }
}

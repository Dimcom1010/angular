import { QueryList,  signal } from '@angular/core';
import { Subject } from 'rxjs';

import { PaginationTable } from './pagination-table';
import { SortTable } from './sort-table';
import { TemplateRowDirective } from '../template-row.directive';
import { ColumnTable } from './column';
import { DataNodeTable } from './data-table';

export abstract class Table {
  selected = signal<number | null>(null);
  isLoading = signal(false);

  pagination = signal<PaginationTable>({ pageIndex: 1, pageSize: 10 });
  search = signal<string | null>(null);
  sorting = signal<SortTable | null>(null);

  data = signal<DataNodeTable[]>([]);
  count = signal(0);

  templatesKeyMap: { [key: string]: TemplateRowDirective } = {};

  protected readonly subUpdateTable$ = new Subject<void>();

  updateTable() {
    this.subUpdateTable$.next();
  }

  changeSort(column: ColumnTable) {
    const old = this.sorting();
    if (!old || old?.key !== column.key) {
      this.sorting.set({ key: column.key, order: 'ascend' });
    } else {
      if (old.order === 'ascend') {
        this.sorting.set({ key: column.key, order: 'descend' });
      } else if (old.order === 'descend') {
        this.sorting.set(null);
      }
    }
  }

  paginationEvent(pageIndex: number, pageSize: number) {
    this.pagination.set({ pageIndex, pageSize });
  }

  reset() {
    this.pagination.set({ pageIndex: 1, pageSize: this.pagination().pageSize });
  }

  trackByMethod(_: number, item: ColumnTable) {
    return item.key;
  }

  /**
   * Записывание templateRef для колонок с типом template
   */
  protected reCalcTemplateRef(templates: QueryList<TemplateRowDirective>): void {
    templates?.forEach((e) => (this.templatesKeyMap[e.key] = e));
  }

  /**
   * Сохранение осовных элементов управления таблицы
   */
  protected saveUi(lsName: string, pagination: PaginationTable, sorting: SortTable | null) {
    if (!lsName) {
      return;
    }
    try {
      const pageSize = pagination.pageSize;
      localStorage.setItem(lsName, JSON.stringify({ pageSize, sorting: sorting }));
    } catch {}
  }

  /**
   * Восстановление освновных элементов управления таблицы
   */
  protected loadUi(lsName: string) {
    if (!lsName) {
      return;
    }
    try {
      const text = localStorage.getItem(lsName);
      if (!text) {
        return;
      }
      const filterUi = JSON.parse(text);
      const pageSize = filterUi?.pageSize ?? 10;
      const sorting = filterUi?.sorting ?? null;
      this.pagination.mutate((p) => (p.pageSize = pageSize));
      this.sorting.set(sorting);
    } catch {}
  }
}

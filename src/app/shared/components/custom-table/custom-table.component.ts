import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, effect } from '@angular/core';
import { Injector, Input, OnDestroy, OnInit, Output, QueryList, inject, EventEmitter } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, filter, merge } from 'rxjs';
import { skip, startWith, switchMap, take, takeUntil, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { NzMessageService } from 'ng-zorro-antd/message';

import { DestroyService } from '@shared/services';
import { ClickRowTable } from './model/click-row';
import { GetDataRequestType, DataTable, DataNodeTable } from './model/data-table';
import { ColumnTable } from './model/column';
import { TemplateRowDirective } from './template-row.directive';
import { Table } from './model/table';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent extends Table implements OnInit, AfterContentInit, OnDestroy {
  /**
   * Колонки таблицы
   */
  @Input() columns: ColumnTable[] = [];

  /**
   * Функция получения данных
   * Если обновить её ссылку будет вызван повторный запрос
   */
  @Input() getData!: (request: GetDataRequestType) => Observable<DataTable>;

  /**
   * Ширина колонок
   */
  @Input() width = '1000px';

  /**
   * Высота колонок
   */
  @Input() heigth = 'calc(100vh - 200px)';

  /**
   * Имя таблицы для сохранения в localstorage
   */
  @Input() lsName!: string;

  /**
   * Клик по строке
   */
  private readonly _clickRow = new Subject<ClickRowTable>();
  @Output() clickRow = this._clickRow.pipe(debounceTime(200));

  /**
   * Двойной клик по строке
   */
  @Output() doubleClickRow = new EventEmitter<ClickRowTable>();

  /**
   * Вставляемые template для колонок
   */
  @ContentChildren(TemplateRowDirective, { descendants: true })
  templates!: QueryList<TemplateRowDirective>;

  private readonly msg = inject(NzMessageService);
  private readonly injector = inject(Injector);
  private readonly destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.loadUi(this.lsName);
    effect(
      () => {
        const pagination = this.pagination();
        const sort = this.sorting();
        this.saveUi(this.lsName, pagination, sort);
      },
      { injector: this.injector },
    );
    merge(
      this.subUpdateTable$,
      toObservable(this.sorting, { injector: this.injector }),
      toObservable(this.pagination, { injector: this.injector }),
      toObservable(this.search, { injector: this.injector }).pipe(debounceTime(200), skip(1)),
    )
      .pipe(
        startWith(''),
        debounceTime(50),
        filter(() => !this.isLoading() || !!this.getData),
        tap(() => (this.isLoading.set(true), this.selected.set(null))),
        switchMap(() =>
          this.getData({
            ...this.pagination(),
            search: this.search() ?? '',
            sorting: this.sorting() ?? undefined,
          }).pipe(
            take(1),
            catchError((error) => (this.msg.error(error?.error ?? error), [])),
          ),
        ),
        takeUntil(this.destroy$),
        tap(() => this.isLoading.set(false)),
      )
      .subscribe((data) => (this.data.set(data.nodes), this.count.set(data.count)));
  }

  ngAfterContentInit(): void {
    this.templates.changes
      .pipe(startWith(''), takeUntil(this.destroy$))
      .subscribe(this.reCalcTemplateRef.bind(this, this.templates));
  }

  clickedRow(row: DataNodeTable<any>, column: ColumnTable, index: number) {
    this.selected.set(index);
    this._clickRow.next({ columnKey: column.key, row });
  }

  dbClickedRow(row: DataNodeTable<any>, column: ColumnTable) {
    this.doubleClickRow.emit({ columnKey: column.key, row });
  }

  ngOnDestroy(): void {
    this.subUpdateTable$?.complete();
  }
}

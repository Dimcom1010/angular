import { NzTableSortOrder } from 'ng-zorro-antd/table';

export type SortTable<T = any> = {
  key: keyof T & string;
  order: NzTableSortOrder;
};

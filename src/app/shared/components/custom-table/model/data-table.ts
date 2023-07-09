import { SortTable } from './sort-table';

export type DataTable<T = any> = {
  count: number;
  nodes: DataNodeTable<T>[];
};
export type DataNodeTable<T = any> = {
  [K in keyof T]: T[K];
};

export type GetDataRequestType = {
  pageSize: number;
  pageIndex: number;
  search: string;
  sorting?: SortTable;
};

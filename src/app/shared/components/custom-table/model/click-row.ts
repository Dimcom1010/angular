import { DataNodeTable } from './data-table';

export type ClickRowTable<T = any> = {
  columnKey: keyof T;
  row: DataNodeTable<T>;
};

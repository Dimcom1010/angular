export class ColumnTable<T = any> {
  key!: keyof T & string;
  name!: string;
  width?: string;
  isSort?: boolean = false;
}

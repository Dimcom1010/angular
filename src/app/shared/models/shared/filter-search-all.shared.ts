export type FilterSearchAll<T = any> = {
  search?: string;
  pageIndex: number;
  pageSize: number;
  sort?: { key: keyof T; order: 'ASC' | 'DESC' | null };
  exclude?: number[];
};

export type ResponseData<T> = {
  nodes: T[];
  count: number;
};

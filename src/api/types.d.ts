export interface PageData {
  pageNum: number;
  pageSize: number;
}

export interface PageResult<T> {
  total: number;
  current: number;
  pageSize: number;
  list: T[];
}

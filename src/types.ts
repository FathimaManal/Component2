export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface DataTableState<T> {
  sortConfig: SortConfig | null;
  selectedRows: Set<string>;
} 
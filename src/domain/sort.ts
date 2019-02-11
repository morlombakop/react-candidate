export interface ISort extends IBaseSort {
  onSort: (columnName: string, sortDirection: string) => void
}

export interface IBaseSort {
  direction: string
  activeColumn: string
}

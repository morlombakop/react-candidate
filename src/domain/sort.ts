export const ASCENDING = 'asc'
export const DESCENDING = 'desc'
export const EXPERIENCE = 'year_of_experience'
export const POSITION_APPLIED = 'position_applied'
export const APPLICATION_DATE = 'application_date'

export interface ISort extends IBaseSort {
  onSort: (columnName: string, sortDirection: string) => void
}

export interface IBaseSort {
  direction: string
  activeColumn: string
}

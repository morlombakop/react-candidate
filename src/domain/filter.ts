export interface IFilter {
  onCancel: () => void
  applyFilter: (filters: IFilterQuery[]) => void
  isModalOpen: boolean
  filters: IFilterQuery[]
  filterConfig: IFilterConfig[]
}

export interface IFilterInput {
  name: string
  displayText?: string
}

export interface IFilterConfig {
  column: string
  titleLabel: string
  inputs: IFilterInput[]
}

export interface IFilterQuery {
  column: string
  selectedValues: string[]
}

import * as React from 'react'
import { orderBy } from 'lodash'

import App from '../components/app'
import ICandidate from '../domain/candidate'

import * as data from '../data.json' // fake data for development to be removed

import {
  EXPERIENCE,
  POSITION_APPLIED,
  APPLICATION_DATE,
  ASCENDING,
  DESCENDING,
  IBaseSort,
} from '../domain/sort'
import { IFilter } from '../domain/filter'

type AppContainerState = {
  candidates: ICandidate[]
  isLoading: boolean
  sort: IBaseSort
  isModalFilterOpen: boolean
}

class AppContainer extends React.Component<{}, AppContainerState> {
  readonly state: AppContainerState = {
    candidates: data.data,
    isLoading: false,
    sort: {
      direction: ASCENDING, // default sort direction
      activeColumn: APPLICATION_DATE, // default sort column
    },
    isModalFilterOpen: false,
  }

  getFilterProps = (): IFilter => ({
    isModalOpen: this.state.isModalFilterOpen,
    onCancel: this.handleOnCancelFilter,
  })

  handleShowFilter = () =>
    this.setState(state => ({ ...state, isModalFilterOpen: true }))

  handleOnCancelFilter = () =>
    this.setState(state => ({
      ...state,
      isModalFilterOpen: false,
    }))

  // handle on sortable column header click
  handleOnSort = (columnName: string, sortDirection: string) => {
    if (columnName === this.state.sort.activeColumn) {
      this.setState(state => ({
        ...state,
        candidates: this.sortCandidates(
          columnName,
          sortDirection,
          state.candidates
        ),
        sort: { ...state.sort, direction: sortDirection },
      }))
    } else {
      this.setState(state => ({
        ...state,
        candidates: this.sortCandidates(
          columnName,
          ASCENDING,
          state.candidates
        ),
        sort: { direction: ASCENDING, activeColumn: columnName },
      }))
    }
  }

  // Sort our list of applicants.
  sortCandidates = (
    columnName: string,
    sortDirection: string,
    candidates: ICandidate[]
  ): ICandidate[] => {
    const isAscendingSort = sortDirection === ASCENDING
    switch (columnName) {
      case APPLICATION_DATE: {
        // Since Our date is ISO format we can use Date.Parse to convert in to unix time.
        return isAscendingSort
          ? candidates.sort(
              (a, b) => Date.parse(a[columnName]) - Date.parse(b[columnName])
            )
          : candidates.sort(
              (a, b) => Date.parse(b[columnName]) - Date.parse(a[columnName])
            )
      }
      default: {
        return isAscendingSort
          ? orderBy(candidates, [columnName], [ASCENDING])
          : orderBy(candidates, [columnName], [DESCENDING])
      }
    }
  }

  render() {
    return (
      <App
        candidates={this.state.candidates}
        // We could use the context API to avoid passing props like sort across multiples components.
        // Need some refactoring here.
        sort={{ ...this.state.sort, onSort: this.handleOnSort }}
        showFilters={this.handleShowFilter}
        filter={this.getFilterProps()}
      />
    )
  }
}

export default AppContainer

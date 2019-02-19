import * as React from 'react'
import { orderBy, get } from 'lodash'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import qs from 'qs'

import App from '../components/app'
import Loader from '../components/loader'
import Error from '../components/error'
import ICandidate from '../domain/candidate'
import { IBaseSort } from '../domain/sort'
import {
  columns,
  APPLICANT_NAME,
  APPLICATION_DATE,
  APPLICATION_STATUS,
  EXPERIENCE,
  ASCENDING,
  DESCENDING,
  POSITION_APPLIED,
} from '../domain/constants'
import { IFilter, IFilterInput, IFilterQuery } from '../domain/filter'
import filterConfig from '../config/filters'
import fetchApplicants from '../services/rest-api'

interface AppContainerProps extends RouteComponentProps {}

type AppContainerState = {
  untouchedCandidates: ICandidate[]
  candidates: ICandidate[]
  isLoading: boolean
  isError: boolean
  sort: IBaseSort
  isModalFilterOpen: boolean
  positionFilterInputs: IFilterInput[]
  filters: IFilterQuery[]
}

class AppContainer extends React.Component<
  AppContainerProps,
  AppContainerState
> {
  readonly state: AppContainerState = {
    untouchedCandidates: [],
    candidates: [],
    isLoading: true,
    isError: false,
    sort: {
      direction: ASCENDING, // default sort direction
      activeColumn: APPLICANT_NAME, // default sort column
    },
    isModalFilterOpen: false,
    positionFilterInputs: [],
    filters: [],
  }

  componentDidMount() {
    if (this.state.untouchedCandidates.length === 0) {
      this.getCandidates()
    }
  }

  getCandidates = () => {
    const ulrParam = qs.parse(this.props.location.search.replace('?', ''))
    const param = this.validateUrlParams(ulrParam)
      ? ulrParam
      : { sort: this.state.sort, filter: this.state.filters }

    fetchApplicants()
      .then(res => {
        if (!res.data.error && this.state.untouchedCandidates.length === 0) {
          this.setState(state => ({
            ...state,
            filters: param.filters,
            sort: param.sort,
            untouchedCandidates: res.data.data,
            candidates: this.sortCandidates(
              param.sort.activeColumn,
              param.sort.direction,
              this.filterCandidates(param.filters, res.data.data)
            ),
            isLoading: false,
            isError: false,
          }))
        } else {
          this.setState(state => ({
            ...state,
            isError: true,
            isLoading: false,
          }))
        }
      })
      .catch(() => {
        if (this.state.untouchedCandidates.length === 0) {
          this.setState(state => ({
            ...state,
            isError: true,
            isLoading: false,
          }))
        }
      })
  }
  // using arrow function here to avoid writing a constructor binding this method to the class.
  getFilterProps = (): IFilter => ({
    onCancel: this.handleOnCancelFilter,
    applyFilter: this.handleApplyFilters,
    // this should be build in the config as we will know all positions on app design.
    filterConfig: [
      filterConfig[0], // pic the first filter for status since it is complete.
      {
        ...filterConfig[1],
        inputs: this.buildPositionFilterInput(),
      },
    ],
    isModalOpen: this.state.isModalFilterOpen,
    // should be retrieving this value from the url params later
    filters: [
      {
        column: APPLICATION_STATUS,
        selectedValues: [],
      },
      {
        column: POSITION_APPLIED,
        selectedValues: [],
      },
    ],
  })

  // This method will not be needed normally, all positions should be gathered on initial stage
  buildPositionFilterInput = (): IFilterInput[] => {
    const inputs = this.state.untouchedCandidates.reduce(
      (inputs: IFilterInput[], candidate) =>
        inputs.every(input => input.name !== candidate.position_applied)
          ? // Spreed operator is faster compare to concat.
            // However spreed can trow exception  for large arrays.
            inputs.concat({
              name: candidate.position_applied,
            })
          : inputs,
      []
    )

    // Could use es6 sort by here and reduce app dependency,
    // but with string sort and possible unknown language character, i use use lodash.
    return orderBy(inputs, [input => get(input, 'name', '').toLowerCase()])
  }

  handleShowFilter = () =>
    this.setState(state => ({ ...state, isModalFilterOpen: true }))

  handleOnCancelFilter = () =>
    this.setState(state => ({
      ...state,
      isModalFilterOpen: false,
    }))

  // handle on sortable column header click
  handleOnSort = (columnName: string, sortDirection: string) => {
    const urlParam = qs.stringify({
      filters: this.state.filters,
      sort: {
        direction: sortDirection,
        activeColumn: columnName,
      },
    })

    if (columnName === this.state.sort.activeColumn) {
      this.setState(
        state => ({
          ...state,
          candidates: this.sortCandidates(
            columnName,
            sortDirection,
            state.candidates
          ),
          sort: { ...state.sort, direction: sortDirection },
        }),
        () => this.props.history.push(`?${urlParam}`)
      )
    } else {
      this.setState(
        state => ({
          ...state,
          candidates: this.sortCandidates(
            columnName,
            ASCENDING,
            state.candidates
          ),
          sort: { direction: ASCENDING, activeColumn: columnName },
        }),
        () => this.props.history.push(`?${urlParam}`)
      )
    }
  }

  handleApplyFilters = (filters: IFilterQuery[]) => {
    const urlParam = qs.stringify({ filters, sort: this.state.sort })
    this.props.history.push(`?${urlParam}`)

    this.setState(state => ({
      ...state,
      filters,
      candidates: this.sortCandidates(
        state.sort.activeColumn,
        state.sort.direction,
        this.filterCandidates(filters)
      ),
    }))
  }

  filterCandidates = (
    filters: IFilterQuery[] = this.state.filters,
    applicants: ICandidate[] = this.state.untouchedCandidates
  ): ICandidate[] =>
    filters.reduce(
      (candidates: ICandidate[], query) =>
        query.selectedValues.length
          ? candidates.filter(candidate =>
              query.selectedValues.includes(candidate[query.column])
            )
          : candidates,
      applicants
    )

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
              (a, b) => Date.parse(b[columnName]) - Date.parse(a[columnName])
            )
          : candidates.sort(
              (a, b) => Date.parse(a[columnName]) - Date.parse(b[columnName])
            )
      }

      case EXPERIENCE: {
        return isAscendingSort
          ? candidates.sort((a, b) => b[columnName] - a[columnName])
          : candidates.sort((a, b) => a[columnName] - b[columnName])
      }

      case APPLICANT_NAME:
      case POSITION_APPLIED: {
        // using lodash for string sorting as some
        return isAscendingSort
          ? orderBy(
              candidates,
              [candidate => candidate[columnName].toLowerCase()],
              [ASCENDING]
            )
          : orderBy(
              candidates,
              [candidate => candidate[columnName].toLowerCase()],
              [DESCENDING]
            )
      }

      default:
        return candidates
    }
  }

  handleRetry = () =>
    this.setState(
      state => ({ ...state, isError: false, isLoading: true }),
      this.getCandidates
    )

  // validate the url params.
  validateUrlParams = ({
    sort,
    filters,
  }: {
    sort: IBaseSort
    filters: IFilterQuery[]
  }): boolean => {
    if (!sort || !filters) {
      return false
    }
    const { direction, activeColumn } = sort

    const isValidSort =
      columns.includes(activeColumn) &&
      (direction === ASCENDING || direction === DESCENDING)

    const isValidFilters = filters.every(
      filter =>
        columns.includes(filter.column) && Array.isArray(filter.selectedValues)
    )

    return isValidFilters && isValidSort
  }

  render() {
    if (this.state.isError) {
      return <Error retry={this.handleRetry} />
    }
    if (this.state.isLoading) {
      return <Loader />
    }
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

export default withRouter(AppContainer)

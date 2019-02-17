import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

import FilterCard from './filter-card'
import { IFilter, IFilterQuery } from '../../domain/filter'

// This is mandatory according to react-modal team.
Modal.setAppElement('#root')

type FiltersProps = IFilter
type FiltersState = {
  internalFilters: IFilterQuery[]
}

// Extending React.PureComponent here to prevent this component
// from re-rendering each time the app-container state changes
class Filter extends React.PureComponent<FiltersProps, FiltersState> {
  readonly state: FiltersState = {
    internalFilters: this.props.filters,
  }

  // all styles would be better applied with CSS or done here with styled-components.
  getStyles = () => ({
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: 0,
      backgroundColor: '#0a8bd1', // color-primary
      color: '#fff',
      paddingTop: '10px',
      minWidth: '500px',
    },
  })

  getCheckboxStatus = (name: string, column: string): boolean =>
    this.state.internalFilters.some(
      filter =>
        filter.column === column &&
        Array.isArray(filter.selectedValues) &&
        filter.selectedValues.includes(name)
    )

  handleOnFilterCardChange = (
    column: string,
    name: string,
    isChecked: boolean
  ) =>
    this.setState(state => ({
      ...state,
      internalFilters: state.internalFilters.reduce(
        (queries: IFilterQuery[], query) =>
          query.column === column
            ? [
                // using spreed operator as it is faster than concat
                ...queries,
                // modify query values for this column
                {
                  ...query,
                  selectedValues: isChecked
                    ? // add filter value
                      [...query.selectedValues, name]
                    : // remove filter value
                      query.selectedValues.filter(value => value !== name),
                },
              ]
            : // Keep query
              [...queries, query],
        []
      ),
    }))

  handleResetFilters = () =>
    this.setState(
      state => ({
        ...state,
        internalFilters: state.internalFilters.reduce(
          (queries: IFilterQuery[], query) => [
            ...queries,
            // empty all selected values
            { ...query, selectedValues: [] },
          ],
          []
        ),
      }),
      () => {
        this.handleOnApplyFilters()
        this.props.onCancel()
      }
    )

  handleOnApplyFilters = () => {
    this.props.applyFilter(this.state.internalFilters)
    this.props.onCancel()
  }

  renderHeader = (): JSX.Element => (
    <div className="div-flex space-between">
      <h3>
        <FormattedMessage
          id="reactCandidate.filter.title"
          defaultMessage="Filters"
        />
      </h3>
      <button onClick={this.props.onCancel} className="icon-btn">
        <FaTimes />
      </button>
    </div>
  )

  renderFooter = (): JSX.Element => (
    <div className="div-reverse">
      <button
        onClick={this.handleOnApplyFilters}
        className="btn-primary-bordered"
        type="button"
      >
        <FormattedMessage
          id="reactCandidate.filter.apply"
          defaultMessage="Apply"
        />
      </button>
      <button
        onClick={this.handleResetFilters}
        className="btn-primary-bordered m-r-half"
        type="button"
      >
        <FormattedMessage
          id="reactCandidate.filter.reset"
          defaultMessage="Reset"
        />
      </button>
      <button
        className="btn-primary-bordered m-r-half"
        onClick={this.props.onCancel}
        type="button"
      >
        <FormattedMessage
          id="reactCandidate.filter.cancel"
          defaultMessage="Cancel"
        />
      </button>
    </div>
  )

  renderFilters = (): JSX.Element => (
    <React.Fragment>
      {this.props.filterConfig.map(config => (
        <FilterCard
          key={config.column}
          onChange={this.handleOnFilterCardChange}
          getCheckboxStatus={this.getCheckboxStatus}
          inputs={config.inputs}
          titleLabel={config.titleLabel}
          column={config.column}
        />
      ))}
    </React.Fragment>
  )

  render() {
    return (
      <div data-testid="filter" className="filter">
        <Modal isOpen={this.props.isModalOpen} style={this.getStyles()}>
          {this.renderHeader()}
          {this.renderFilters()}
          {this.renderFooter()}
        </Modal>
      </div>
    )
  }
}

export default Filter

import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { FaFilter } from 'react-icons/fa'

import ICandidate from '../../domain/candidate'
import { ISort } from '../../domain/sort'
import { IFilter } from '../../domain/filter'

import Table from '../table'
import Filter from '../filter'

type AppProps = {
  candidates: ICandidate[]
  sort: ISort
  filter: IFilter
  showFilters: () => void
}

const App: React.FC<AppProps> = props => {
  const { candidates, sort, filter, showFilters } = props
  return (
    <div data-testid="application">
      <div className="div-flex space-between align-end">
        <h3 className="text-primary">
          <FormattedMessage
            id="reactCandidate.app.title"
            defaultMessage="Applicant List"
          />
        </h3>
        <button onClick={showFilters} className="btn-primary m-b-half">
          <FaFilter />
          <span className="p-l-1">
            <FormattedMessage
              id="reactCandidate.app.filters"
              defaultMessage="Filters"
            />
          </span>
        </button>
      </div>
      <Table candidates={candidates} sort={sort} />
      <Filter
        onCancel={filter.onCancel}
        isModalOpen={filter.isModalOpen}
        filterConfig={filter.filterConfig}
        filters={filter.filters}
        applyFilter={filter.applyFilter}
      />
    </div>
  )
}

export default App

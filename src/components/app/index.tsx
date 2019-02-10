import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import Table from '../table'
import ICandidate from '../../domain/candidate'
import { ISort } from '../../domain/sort'

type AppProps = {
  candidates: ICandidate[]
  sort: ISort
}

const App: React.FC<AppProps> = props => {
  const { candidates, sort } = props
  return (
    <div data-testid="application">
      <div>
        <h3>
          <FormattedMessage
            id="reactCandidate.app.title"
            defaultMessage="Applicant List"
          />
        </h3>
      </div>

      <Table candidates={candidates} sort={sort} />
    </div>
  )
}

export default App

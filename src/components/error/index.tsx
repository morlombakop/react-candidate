import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { FaExclamationTriangle } from 'react-icons/fa'

type ErrorProp = {
  retry: () => void
}

const Error: React.FC<ErrorProp> = ({ retry }) => (
  <div data-testid="error" className="center">
    <div className="error align-center">
      <FaExclamationTriangle color="red" size={100} />
      <h5>
        <FormattedMessage
          id="reactCandidate.error.title"
          defaultMessage="Error fetching data"
        />
      </h5>
      <button className="btn" type="button" onClick={retry}>
        <FormattedMessage
          id="reactCandidate.error.tryAgain"
          defaultMessage="Try Again"
        />
      </button>
    </div>
  </div>
)

export default Error

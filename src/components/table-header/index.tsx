import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { FaArrowUp } from 'react-icons/fa'

class TableHeader extends React.PureComponent {
  render() {
    return (
      <div className="table-header" data-testid="table-header">
        <span>Name</span>
        <FaArrowUp />
      </div>
    )
  }
}

export default TableHeader

import * as React from 'react'
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa'

import { ASCENDING, DESCENDING, ISort } from '../../domain/sort'

type ActionHeaderProps = {
  text: JSX.Element
  columnName: string
  sort: ISort
}

const ActionHeader: React.FC<ActionHeaderProps> = props => {
  const { columnName, sort, text } = props
  const { direction, onSort, activeColumn } = sort

  const handleOnClick = () => {
    const sortDirection = direction === ASCENDING ? DESCENDING : ASCENDING
    onSort(columnName, sortDirection)
  }

  const renderDirection = (): React.ReactNode => {
    if (columnName !== activeColumn) {
      return null
    }
    return direction === ASCENDING ? <FaSortAmountUp /> : <FaSortAmountDown />
  }

  return (
    <th
      className="table-header"
      data-testid="table-header"
      onClick={handleOnClick}
    >
      <div className="table-header-action">
        {text}
        {renderDirection()}
      </div>
    </th>
  )
}

export default ActionHeader

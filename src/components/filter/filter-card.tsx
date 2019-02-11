import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { IFilterConfig } from '../../domain/filter'
import CheckBox from './checkbox'

interface IFiltersCardProps extends IFilterConfig {
  onChange: (column: string, name: string, isChecked: boolean) => void
  getCheckboxStatus: (name: string, column: string) => boolean
}

type FiltersCardProps = IFiltersCardProps

const FilterCard: React.FC<FiltersCardProps> = props => {
  const { onChange, inputs, getCheckboxStatus, titleLabel, column } = props

  const handleOnChange = (name: string, isChecked: boolean) =>
    onChange(column, name, isChecked)

  return (
    <div className="card-container" data-testid="card-container">
      <h4>
        <FormattedMessage id={titleLabel} />
      </h4>
      <div className="filter-item">
        {inputs.map(input => (
          <CheckBox
            key={input.name}
            isChecked={getCheckboxStatus(input.name, column)}
            name={input.name}
            displayText={input.displayText}
            onChange={handleOnChange}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterCard

import * as React from 'react'
import { FormattedMessage } from 'react-intl'

type CheckBoxState = {
  isChecked: boolean
}

// Extending React.PureComponent here to prevent this component
// from re-rendering each time the app-container state changes
class CheckBox extends React.PureComponent<{}, CheckBoxState> {
  readonly state: CheckBoxState = {
    isChecked: false,
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target
    console.info('Helllo XXXXXX', name)
    this.setState(state => ({ ...state, isChecked: checked }))
  }

  render() {
    return (
      <label htmlFor="checkbox" className="div-flex align-center">
        <input
          type="checkbox"
          name="myCheckbox"
          checked={this.state.isChecked}
          onChange={this.handleOnChange}
        />
        <FormattedMessage
          id="reactCandidate.filter.title"
          defaultMessage="Filters"
        />
      </label>
    )
  }
}

export default CheckBox

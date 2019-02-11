import * as React from 'react'
import { FormattedMessage } from 'react-intl'

type CheckBoxProps = {
  name: string
  isChecked: boolean
  onChange: (name: string, isChecked: boolean) => void
  displayText?: string
}

// Extending React.PureComponent here to prevent this component
// from re-rendering each time the app-container state changes
class CheckBox extends React.PureComponent<CheckBoxProps> {
  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target
    this.props.onChange(name, checked)
  }

  render() {
    return (
      <div className="div-flex">
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            name={this.props.name}
            checked={this.props.isChecked}
            onChange={this.handleOnChange}
          />
          <span className="m-b-half">
            {this.props.displayText ? (
              <FormattedMessage id={this.props.displayText} />
            ) : (
              this.props.name
            )}
          </span>
        </label>
      </div>
    )
  }
}

export default CheckBox

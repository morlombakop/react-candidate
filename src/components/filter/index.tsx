import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

import { IFilter } from '../../domain/filter'

import CheckBox from './checkbox'

// This is mandatory according to react-modal team.
Modal.setAppElement('#root')

// please remove links below
// https://stackoverflow.com/questions/44590352/filter-by-multiple-keys-and-values-javascript
// https://stackoverflow.com/questions/31831651/javascript-filter-array-multiple-conditions

type FiltersProps = IFilter
type CheckBoxState = {
  isChecked: boolean
}

// Extending React.PureComponent here to prevent this component
// from re-rendering each time the app-container state changes
class Filter extends React.PureComponent<FiltersProps, CheckBoxState> {
  readonly state: CheckBoxState = {
    isChecked: false,
  }

  // all the style would be better applied with CSS or done here with styled-components.
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
      paddingTop: 0,
    },
  })

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.info('Helllo wwwwwwwww')
    const isChecked = event.target.checked
    this.setState(state => ({ ...state, isChecked }))
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
      <button className="btn-primary-bordered" type="button">
        <FormattedMessage
          id="reactCandidate.filter.apply"
          defaultMessage="Apply"
        />
      </button>
      <button className="btn-primary-bordered m-r-half" type="button">
        <FormattedMessage
          id="reactCandidate.filter.reset"
          defaultMessage="Reset"
        />
      </button>
      <button className="btn-primary-bordered m-r-half" type="button">
        <FormattedMessage
          id="reactCandidate.filter.cancel"
          defaultMessage="Cancel"
        />
      </button>
    </div>
  )

  render() {
    return (
      <div data-testid="filter" className="filter">
        <Modal
          isOpen={this.props.isModalOpen}
          style={this.getStyles()}
          contentLabel="Example Modal"
        >
          {this.renderHeader()}
          <h2>Hello</h2>
          <button onClick={this.props.onCancel}>close</button>
          <div>I am a modal</div>
          <h1>Hello Modal 1</h1>
          <h1>Custom Checkboxes</h1>

          <CheckBox />
          <CheckBox />
          <CheckBox />

          <h1>Hello Modal 3</h1>
          <h1>Hello Modal 4</h1>
          {this.renderFooter()}
        </Modal>
      </div>
    )
  }
}

export default Filter

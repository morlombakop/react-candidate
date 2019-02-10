import * as React from 'react'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'
import './styles/index.scss'

import * as messages from './i18n/en-gb.json'
import AppContainer from './containers/app-container'

render(
  <IntlProvider locale="en-gb" messages={messages}>
    <AppContainer />
  </IntlProvider>,
  document.getElementById('root')
)

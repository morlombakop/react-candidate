import * as React from 'react'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'
import './styles.scss'

import * as messages from './i18n/en-gb.json'
import App from './components/app'

render(
  <IntlProvider locale="en-gb" messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
)

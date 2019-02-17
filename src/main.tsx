import * as React from 'react'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'

import './styles/index.scss'
import * as messages from './i18n/en-gb.json'
import AppRouter from './containers/app-router'

render(
  <IntlProvider locale="en-gb" messages={messages}>
    <AppRouter />
  </IntlProvider>,
  document.getElementById('root')
)

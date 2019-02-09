import * as React from 'react'
import { render } from 'react-testing-library'

import App from '../App'

/**
 * Just a simple integration tests
 */

test('App Component renders with container div', () => {
  const wrap = render(<App />)
  expect(wrap.getByTestId('app-container')).toBeTruthy()
})

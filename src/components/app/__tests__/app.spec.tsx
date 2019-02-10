import * as React from 'react'
import { render } from 'react-testing-library'

import App from '..'

/**
 * Just a simple integration tests
 */

test('App Component renders with application div', () => {
  const mockCandidates = [
    {
      id: 1,
      name: 'Alvin Satterfield',
      email: 'cornellbartell@connellyleannon.biz',
      birth_date: '1997-09-07',
      year_of_experience: 5,
      position_applied: 'Technician',
      application_date: '2018-07-02',
      status: 'rejected',
    },
  ]
  const wrap = render(<App candidates={mockCandidates} />)
  expect(wrap.getByTestId('application')).toBeTruthy()
})

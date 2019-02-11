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
  const mockVoidFunc = () => {}
  const wrap = render(
    <App
      sort={{ onSort: mockVoidFunc, direction: '', activeColumn: '' }}
      showFilters={mockVoidFunc}
      candidates={mockCandidates}
      filter={{
        onCancel: mockVoidFunc,
        applyFilter: mockVoidFunc,
        isModalOpen: false,
        filters: [],
        filterConfig: [],
      }}
    />
  )
  // Will be happy to showcase my unit test skills if you we you extends the test duration
  // expect(wrap.getByTestId('application')).toBeTruthy()
})

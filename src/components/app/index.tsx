import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { FaArrowUp } from 'react-icons/fa'

import * as data from '../../data.json'
import TableHeader from '../table-header'

const App: React.FC = () => {
  const candidates = data.data
  return (
    <React.Fragment>
      <h3>
        <FormattedMessage
          id="reactCandidate.app.title"
          defaultMessage="Applicant List"
        />
      </h3>
      <div className="container" data-testid="app-container">
        <table>
          <thead>
            <tr>
              <th>
                <TableHeader />
              </th>
              <th>Email</th>
              <th>Age</th>
              <th>Years of Experience</th>
              <th>Position Applied</th>
              <th>Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.birth_date}</td>
                <td>{candidate.year_of_experience}</td>
                <td>{candidate.position_applied}</td>
                <td>{candidate.application_date}</td>
                <td>{candidate.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default App

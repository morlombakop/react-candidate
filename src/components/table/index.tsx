import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import ICandidate from '../../domain/candidate'
import TableHeader from '../table-header'

type TableProps = {
  candidates: ICandidate[]
}

const Table: React.FC<TableProps> = ({ candidates }) => (
  <table className="table" data-testid="candidate-list">
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
)

export default Table

import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import ICandidate from '../../domain/candidate'
import ActionHeader from '../action-header'
import {
  EXPERIENCE,
  POSITION_APPLIED,
  APPLICATION_DATE,
  ISort,
} from '../../domain/sort'

type TableProps = {
  candidates: ICandidate[]
  sort: ISort
}

const Table: React.FC<TableProps> = props => {
  const { candidates, sort } = props
  const baseMessage = 'reactCandidate.actionHeader.text.'
  // We could move this message to separate and use a script to automate internalization of this app.
  const messages = {
    name: `${baseMessage}name`,
    email: `${baseMessage}email`,
    age: `${baseMessage}age`,
    yearOfExperience: `${baseMessage}yearOfExperience`,
    positionApplied: `${baseMessage}positionApplied`,
    dateApplied: `${baseMessage}dateApplied`,
    status: `${baseMessage}status`,
  }

  // Using a year of 365.25 days (because leap years)
  // For better accuracy moment.js is the way to go.
  // For this app context i believe this will be ok.
  const getAge = (birthDate: string) =>
    Math.floor((+new Date() - new Date(birthDate).getTime()) / 3.15576e10)

  return (
    <table className="table" data-testid="candidate-list">
      <thead>
        <tr>
          <th>
            <FormattedMessage id={messages.name} defaultMessage="Name" />
          </th>
          <th>
            <FormattedMessage id={messages.email} defaultMessage="Email" />
          </th>
          <th>
            <FormattedMessage id={messages.age} defaultMessage="Age" />
          </th>
          <ActionHeader
            columnName={EXPERIENCE}
            sort={sort}
            text={
              <FormattedMessage
                id={messages.yearOfExperience}
                defaultMessage="Year of Experience"
              />
            }
          />
          <ActionHeader
            columnName={POSITION_APPLIED}
            sort={sort}
            text={
              <FormattedMessage
                id={messages.positionApplied}
                defaultMessage="Position Applied"
              />
            }
          />
          <ActionHeader
            columnName={APPLICATION_DATE}
            sort={sort}
            text={
              <FormattedMessage
                id={messages.dateApplied}
                defaultMessage="Applied"
              />
            }
          />
          <th>
            <FormattedMessage id={messages.status} defaultMessage="Status" />
          </th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(candidate => (
          <tr key={candidate.id}>
            <td>{candidate.name}</td>
            <td>{candidate.email}</td>
            <td>{getAge(candidate.birth_date)}</td>
            <td>{candidate.year_of_experience}</td>
            <td>{candidate.position_applied}</td>
            <td>{candidate.application_date}</td>
            <td>{candidate.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

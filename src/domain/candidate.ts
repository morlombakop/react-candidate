import ApplicationStatus from './application-status'

export default interface ICandidate {
  id: string
  name: string
  email: string
  birth_date: string
  year_of_experience: number
  position_applied: string
  application_date: string
  status: ApplicationStatus
}

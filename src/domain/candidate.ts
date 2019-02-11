export default interface ICandidate {
  id: number
  name: string
  email: string
  birth_date: string
  year_of_experience: number
  position_applied: string
  application_date: string
  status: string
  // the line below is to appease type checking God
  // see https://stackoverflow.com/questions/42193262/element-implicitly-has-an-any-type-because-type-window-has-no-index-signatur
  [key: string]: any
}

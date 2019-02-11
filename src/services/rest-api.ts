import axios from 'axios'

export default () =>
  // Best interview API ever :), It got me !!!!
  axios.get('http://personio-fe-test.herokuapp.com/api/v1/candidates')

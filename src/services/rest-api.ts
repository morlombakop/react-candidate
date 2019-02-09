// Parses the JSON returned by a network request
const parseJSON = (response: Response): object | null => {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

// Checks if a network request came back fine, and throws an error if not
const checkStatus = (response: Response): Response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  throw error
}

// fetch data from remote api
export default (url: RequestInfo, options: RequestInit) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

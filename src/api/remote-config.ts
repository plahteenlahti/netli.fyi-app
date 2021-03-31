import { HttpError, NetworkError } from './http.error'

type requestType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const fetchGetJSON = (
  url: string,
  credentials: RequestCredentials_ = 'same-origin',
  headers?: object
) => {
  const defaultHeaders = {
    Accept: 'application/json'
  }
  const requestHeaders = { ...headers, ...defaultHeaders }

  return fetch(url, {
    method: 'GET',
    headers: requestHeaders,
    credentials
  })
    .then((response) => {
      if (response.status >= 400) {
        throwError('GET', response, response.status)
      }
      return response
    })
    .catch(catchNetworkError('GET', url))
}

const catchNetworkError = (type: requestType, url: string) => (
  error: Error
) => {
  if (error.message === 'Network request failed') {
    throw new NetworkError({
      message: `Fetch ${type} to '${url}' failed, Network request failed`,
      statusCode: 500,
      errorCode: 500
    })
  }

  throw error
}

const throwError = (
  type: requestType,
  response: Response,
  errorCode: number
) => {
  throw new HttpError({
    message: `Fetch ${type} to '${response.url}' failed, status ${response.status} - '${response.statusText}' - '${response.bodyUsed}'`,
    statusCode: response.status,
    errorCode
  })
}

const getUrl = (config: string) => `https://netli.fyi/remote-config/${config}`

export const fetchRemoteConfig = (id: string) => {
  return fetchGetJSON(getUrl(id)).then((resp) => resp.json())
}

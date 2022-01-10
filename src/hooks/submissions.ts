import { useQuery } from 'react-query'
import { Submission } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useSubmissions = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Submission>, Error>(
    ['submissions', { siteID, accessToken }],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/sites/${siteID}/submissions`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        return response.json()
      } catch (error) {
        return error
      }
    }
  )
}

export const useSubmission = (submissionID: string) => {
  const accessToken = useToken()

  return useQuery<Submission, Error>(
    ['submission', { submissionID, accessToken }],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/submissions/${submissionID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        return response.json()
      } catch (error) {
        return error
      }
    }
  )
}

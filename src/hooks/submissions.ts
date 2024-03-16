import { useQuery } from '@tanstack/react-query'
import { Submission } from '../typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

export const useSubmissions = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Submission>, Error>({
    queryKey: ['submissions', { siteID, accessToken }],
    queryFn: async () => {
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
  })
}

export const useSubmission = (submissionID: string) => {
  const accessToken = useToken()

  return useQuery<Submission, Error>({
    queryKey: ['submission', { submissionID, accessToken }],
    queryFn: async () => {
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
  })
}

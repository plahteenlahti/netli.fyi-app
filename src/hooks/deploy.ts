import { useQuery } from '@tanstack/react-query'
import { Deploy } from '@typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

export const useDeploys = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Deploy>, Error>({
    queryKey: ['deploys', { siteID, accessToken }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${siteID}/deploys`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return response.json()
      } catch (error) {
        return error
      }
    }
  })
}

export const useDeploy = (buildID: string) => {
  const accessToken = useToken()

  return useQuery<Deploy, Error>({
    queryKey: ['build', { accessToken, buildID }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/deploys/${buildID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        return response.json()
      } catch (error) {
        return error
      }
    }
  })
}

import { useQuery } from '@tanstack/react-query'
import { Deploy } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useDeploys = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Deploy>, Error>(
    ['deploys', { siteID, accessToken }],
    async () => {
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
  )
}

export const useDeploy = (buildID: string) => {
  const accessToken = useToken()

  return useQuery<Deploy, Error>(
    ['build', { accessToken, buildID }],
    async () => {
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
  )
}

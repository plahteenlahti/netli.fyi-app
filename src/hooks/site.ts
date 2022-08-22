import { useQuery } from '@tanstack/react-query'
import { NetlifySite } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useSites = () => {
  const accessToken = useToken()
  return useQuery<Array<NetlifySite>, Error>(
    ['sites', { accessToken }],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/sites?filter=all&sort_by=updated_at`,
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

export const useSite = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<NetlifySite, Error>(
    ['site', { siteID, accessToken }],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${siteID}`, {
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

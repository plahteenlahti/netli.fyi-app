import { useQuery } from 'react-query'
import { Hook } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useHooks = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Hook>, Error>(
    ['hooks', { siteID, accessToken }],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/hooks?site_id=${siteID}`, {
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

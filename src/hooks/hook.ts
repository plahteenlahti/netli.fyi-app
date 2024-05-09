import { useQuery } from '@tanstack/react-query'
import { Hook } from '@typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

export const useHooks = (siteID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Hook>, Error>({
    queryKey: ['hooks', { siteID, accessToken }],
    queryFn: async () => {
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
  })
}

export const useHook = (hookID: string) => {
  const accessToken = useToken()

  return useQuery<Hook, Error>({
    queryKey: ['hooks', { hookID, accessToken }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/hooks/${hookID}`, {
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

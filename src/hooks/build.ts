import { useQuery } from '@tanstack/react-query'
import { Build } from '../typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

export const useBuilds = (accountID: string) => {
  const accessToken = useToken()

  return useQuery<Array<Build>, Error>(
    ['builds', { accountID, accessToken }],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/${accountID}/builds`, {
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

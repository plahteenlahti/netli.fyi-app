import { useQuery } from 'react-query'
import { Build } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

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

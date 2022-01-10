import { useQuery } from 'react-query'
import { useAppSelector } from '../store/store'
import { NetlifySite } from '../typings/netlify'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useSites = () => {
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

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
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

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

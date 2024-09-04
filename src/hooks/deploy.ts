import { useQuery } from '@tanstack/react-query'
import { Deploy } from '@typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useGetToken } from './keychain'

export const useDeploys = (siteID: string) => {
  const token = useGetToken()

  console.log(siteID)

  return useQuery<Array<Deploy>, Error>({
    queryKey: ['deploys', { siteID, accessToken: token.data }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${siteID}/deploys`, {
          headers: {
            Authorization: `Bearer ${token.data}`
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
  const token = useGetToken()

  return useQuery<Deploy, Error>({
    queryKey: ['build', { accessToken: token.data, buildID }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/deploys/${buildID}`, {
          headers: {
            Authorization: `Bearer ${token.data}`
          }
        })

        return response.json()
      } catch (error) {
        return error
      }
    }
  })
}

export const useActiveDeploy = (siteID: string) => {
  const token = useGetToken()

  return useQuery<Array<Deploy>, Error, Deploy>({
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    queryKey: ['deploys', { siteID, accessToken: token.data }],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/sites/${siteID}/deploys`, {
          headers: {
            Authorization: `Bearer ${token.data}`
          }
        })

        return response.json()
      } catch (error) {
        return error
      }
    },
    select: data => data[0]
  })
}

import { useQuery } from '@tanstack/react-query'
import { Deploy } from '../typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { reportError } from '../utilities/error'
import { useToken } from './useToken'

type DeployQueryParameters = {
  page?: number
  per_page?: number
}

export const useDeploys = (
  siteID: string,
  { page, per_page }: DeployQueryParameters = { page: 0, per_page: 100 }
) => {
  const accessToken = useToken()

  return useQuery<Array<Deploy>, Error>(
    ['deploys', { siteID, accessToken, page }],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/sites/${siteID}/deploys?page=${page}&per_page=${per_page}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )

        return response.json()
      } catch (error) {
        reportError(error)
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
        reportError(error)
        return error
      }
    }
  )
}

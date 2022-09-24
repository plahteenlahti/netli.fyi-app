import {
  QueryFunctionContext,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { User } from '../typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

const getUser = async ({
  queryKey
}: QueryFunctionContext<
  ['profile', { accessToken: string }]
>): Promise<User> => {
  const [_key, { accessToken }] = queryKey
  const response = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json')
  const data = isJson ? await response.json() : null

  if (!response.ok) {
    const error = (data && data.message) || response.status
    throw new Error(error)
  }

  return data
}

export const usePrefetchUser = () => {
  const queryClient = useQueryClient()
  const accessToken = useToken()

  const call = async () => {
    await queryClient.prefetchQuery(
      ['profile', { accessToken: `${accessToken}` }],
      getUser
    )
  }

  return call
}

export const useUser = () => {
  const accessToken = useToken()
  return useQuery(['profile', { accessToken: `${accessToken}` }], getUser)
}

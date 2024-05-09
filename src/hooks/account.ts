import {
  QueryFunctionContext,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { Account } from '@typings/netlify'
import { BASE_URL } from '../utilities/constants'
import { useToken } from './useToken'

/* ACCOUNTS */

const getAccounts = async ({
  queryKey
}: QueryFunctionContext<['accounts', { accessToken: string }]>): Promise<
  Array<Account>
> => {
  const [_key, { accessToken }] = queryKey
  const response = await fetch(`${BASE_URL}/accounts`, {
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

export const usePrefetchAccounts = () => {
  const queryClient = useQueryClient()
  const accessToken = useToken()

  const call = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['accounts', { accessToken: `${accessToken}` }],
      queryFn: getAccounts
    })
  }

  return call
}

export const useAccounts = () => {
  const accessToken = useToken()
  return useQuery({
    queryKey: ['accounts', { accessToken: `${accessToken}` }],
    queryFn: getAccounts
  })
}

export const getAccount = async ({
  queryKey
}: QueryFunctionContext<
  ['accounts', { accessToken: string; accountID: string }]
>): Promise<Account> => {
  const [_key, { accessToken, accountID }] = queryKey
  const response = await fetch(`${BASE_URL}/accounts/${accountID}`, {
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

export const usePrefetchAccount = () => {
  const queryClient = useQueryClient()
  const accessToken = useToken()

  const call = async (accountID: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['accounts', { accessToken: `${accessToken}`, accountID }],
      queryFn: getAccount
    })
  }

  return call
}

export const useAccount = (accountID: string) => {
  const accessToken = useToken()
  return useQuery({
    queryKey: ['accounts', { accessToken: `${accessToken}`, accountID }],
    queryFn: getAccount,
    enabled: false
  })
}

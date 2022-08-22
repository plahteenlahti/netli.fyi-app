import { useQuery } from '@tanstack/react-query'
import { Account, User } from '../typings/netlify'
import { useToken } from './useToken'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useUser = () => {
  const accessToken = useToken()

  return useQuery<User, Error>(['profile', { accessToken }], async () => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      return response.json()
    } catch (error) {
      return error
    }
  })
}

export const useAccounts = () => {
  const accessToken = useToken()
  return useQuery<Array<Account>, Error>(
    ['accounts', { accessToken }],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/accounts`, {
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

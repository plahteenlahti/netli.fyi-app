import { useQuery } from 'react-query'
import { useAppSelector } from '../store/store'
import { Account, User } from '../typings/netlify'

const BASE_URL = 'https://api.netlify.com/api/v1'

export const useUser = () => {
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )

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
  const accessToken = useAppSelector(
    ({ accounts }) => accounts.selectedAccount?.accessToken
  )
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

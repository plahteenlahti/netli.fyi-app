import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as Keychain from 'react-native-keychain'

// TODO - Update the service name
const SERVICE = 'deploy.nyxo.app'

// Function to get the token from the Keychain
const getAuthToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE
    })

    if (credentials) {
      return credentials.password
    } else {
      return null
    }
  } catch (error) {
    console.log('[KEYCHAIN]:', error)
    throw new Error('Error fetching token')
  }
}

// Function to set the token in the Keychain
const setAuthToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('netlify-token', token, {
      service: SERVICE
    })
  } catch (error) {
    console.log('[KEYCHAIN]:', error)
    throw new Error('Error setting token')
  }
}

// Function to reset the token in the Keychain
const resetAuthToken = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICE
    })
  } catch (error) {
    console.log('[KEYCHAIN]:', error)
    throw new Error('Error resetting token')
  }
}

export const useGetToken = () => {
  return useQuery({
    queryKey: ['authToken'],
    queryFn: getAuthToken
  })
}

export const useSetToken = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setAuthToken,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authToken']
      })
    }
  })
}

export const useResetToken = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: resetAuthToken,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authToken']
      })
    }
  })
}

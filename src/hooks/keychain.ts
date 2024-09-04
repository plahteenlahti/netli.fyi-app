import * as Keychain from 'react-native-keychain'

// TODO - Update the service name
const SERVICE = 'deploy.nyxo.app'

export const useKeychain = () => {
  const resetAuthToken = async () => {
    try {
      await Keychain.resetGenericPassword({
        service: SERVICE
      })
    } catch (error) {
      console.log('[KEYCHAIN]:', error)
    }
  }

  const setAuthToken = async (token: string) => {
    try {
      await Keychain.setGenericPassword('netlify-token', token, {
        service: SERVICE
      })
    } catch (error) {
      console.log('[KEYCHAIN]:', error)
    }
  }

  const getAuthToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SERVICE
      })

      return credentials
    } catch (error) {
      console.log('[KEYCHAIN]:', error)
      return null
    }
  }

  return {
    setAuthToken,
    getAuthToken,
    resetAuthToken
  }
}

import * as Keychain from 'react-native-keychain'

export const useKeychain = () => {
  const resetAuthToken = async () => {
    try {
      await Keychain.resetGenericPassword({
        service: 'netlify'
      })
    } catch (error) {
      console.log('[KEYCHAIN]:', error)
    }
  }

  const setAuthToken = async (token: string) => {
    try {
      await Keychain.setGenericPassword('netlify-token', token, {
        service: 'netlify'
      })
    } catch (error) {
      console.log('[KEYCHAIN]:', error)
    }
  }

  const getAuthToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'netlify'
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

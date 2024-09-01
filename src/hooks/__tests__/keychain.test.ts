import { useKeychain } from '../keychain'
import * as Keychain from 'react-native-keychain'

jest.mock('react-native-keychain')

describe('useKeychain', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should set the auth token', async () => {
    const { setAuthToken } = useKeychain()
    await setAuthToken('my-token')

    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'netlify-token',
      'my-token',
      { service: 'netlify' }
    )
  })

  it('should get the auth token', async () => {
    const { getAuthToken } = useKeychain()
    const mockCredentials = { username: 'netlify-token', password: 'my-token' }

    Keychain.getGenericPassword.mockResolvedValue(mockCredentials)

    const credentials = await getAuthToken()

    expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
      service: 'netlify'
    })
    expect(credentials).toEqual(mockCredentials)
  })

  it('should return null if getting the auth token fails', async () => {
    const { getAuthToken } = useKeychain()

    Keychain.getGenericPassword.mockRejectedValue(
      new Error('Failed to get token')
    )

    const credentials = await getAuthToken()

    expect(Keychain.getGenericPassword).toHaveBeenCalledWith({
      service: 'netlify'
    })
    expect(credentials).toBeNull()
  })

  it('should reset the auth token', async () => {
    const { resetAuthToken } = useKeychain()
    await resetAuthToken()

    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
      service: 'netlify'
    })
  })

  it('should log an error if setting the auth token fails', async () => {
    const { setAuthToken } = useKeychain()

    const consoleSpy = jest.spyOn(console, 'log')
    Keychain.setGenericPassword.mockRejectedValue(
      new Error('Failed to set token')
    )

    await setAuthToken('my-token')

    expect(consoleSpy).toHaveBeenCalledWith('[KEYCHAIN]:', expect.any(Error))
  })

  it('should log an error if resetting the auth token fails', async () => {
    const { resetAuthToken } = useKeychain()

    const consoleSpy = jest.spyOn(console, 'log')
    Keychain.resetGenericPassword.mockRejectedValue(
      new Error('Failed to reset token')
    )

    await resetAuthToken()

    expect(consoleSpy).toHaveBeenCalledWith('[KEYCHAIN]:', expect.any(Error))
  })
})

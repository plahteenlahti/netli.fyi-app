import { openURL } from '../url'
import { Linking } from 'react-native'

jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn()
  },
  Alert: {
    alert: jest.fn()
  }
}))

describe('openURL', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should open the URL if supported', async () => {
    Linking.canOpenURL.mockResolvedValue(true)
    await openURL('https://example.com')
    expect(Linking.canOpenURL).toHaveBeenCalledWith('https://example.com')
    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com')
  })

  it('should log a warning if the URL is not supported', async () => {
    console.warn = jest.fn()
    Linking.canOpenURL.mockResolvedValue(false)
    await openURL('https://example.com')
    expect(Linking.canOpenURL).toHaveBeenCalledWith('https://example.com')
    expect(console.warn).toHaveBeenCalledWith(
      'Cannot open URL: https://example.com'
    )
    expect(Linking.openURL).not.toHaveBeenCalled()
  })

  it('should log a warning if an error occurs', async () => {
    console.warn = jest.fn()
    Linking.canOpenURL.mockRejectedValue(new Error('Some error'))
    await openURL('https://example.com')
    expect(console.warn).toHaveBeenCalledWith(
      'An error occurred',
      new Error('Some error')
    )
  })
})

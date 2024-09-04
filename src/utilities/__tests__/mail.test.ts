import { sendEmail } from '@utilities/mail'
import { Linking } from 'react-native'

jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn()
  }
}))

describe('sendEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send an email with the correct URL when Linking.canOpenURL returns true', async () => {
    // Mock canOpenURL to return true
    ;(Linking.canOpenURL as jest.Mock).mockResolvedValue(true)
    ;(Linking.openURL as jest.Mock).mockResolvedValue(true)

    const to = 'test@example.com'
    const subject = 'Test Subject'
    const body = 'Test Body'
    const cc = 'cc@example.com'
    const bcc = 'bcc@example.com'

    await sendEmail(to, subject, body, { cc, bcc })

    // Expect canOpenURL to be called with the correct mailto URL
    expect(Linking.canOpenURL).toHaveBeenCalledWith(
      'mailto:test@example.com?subject=Test%20Subject&body=Test%20Body&cc=cc%40example.com&bcc=bcc%40example.com'
    )

    // Expect openURL to be called with the same URL
    expect(Linking.openURL).toHaveBeenCalledWith(
      'mailto:test@example.com?subject=Test%20Subject&body=Test%20Body&cc=cc%40example.com&bcc=bcc%40example.com'
    )
  })

  it('should send an email without cc and bcc when Linking.canOpenURL returns true', async () => {
    ;(Linking.canOpenURL as jest.Mock).mockResolvedValue(true)
    ;(Linking.openURL as jest.Mock).mockResolvedValue(true)

    const to = 'test@example.com'
    const subject = 'Test Subject'
    const body = 'Test Body'

    await sendEmail(to, subject, body)

    // Expect canOpenURL to be called with the correct mailto URL
    expect(Linking.canOpenURL).toHaveBeenCalledWith(
      'mailto:test@example.com?subject=Test%20Subject&body=Test%20Body'
    )

    // Expect openURL to be called with the same URL
    expect(Linking.openURL).toHaveBeenCalledWith(
      'mailto:test@example.com?subject=Test%20Subject&body=Test%20Body'
    )
  })

  it('should throw an error when Linking.canOpenURL returns false', async () => {
    // Mock canOpenURL to return false
    ;(Linking.canOpenURL as jest.Mock).mockResolvedValue(false)

    const to = 'test@example.com'
    const subject = 'Test Subject'
    const body = 'Test Body'

    await expect(sendEmail(to, subject, body)).rejects.toThrow(
      'Provided URL can not be handled'
    )

    // Ensure that openURL was never called
    expect(Linking.openURL).not.toHaveBeenCalled()
  })
})

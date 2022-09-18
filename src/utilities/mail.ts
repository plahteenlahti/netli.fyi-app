import qs from 'qs'
import { Linking } from 'react-native'

export const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  options: { cc?: string; bcc?: string } = {}
) => {
  const { cc, bcc } = options

  let url = `mailto:${to}`

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc
  })

  if (query.length) {
    url += `?${query}`
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url)

  if (!canOpen) {
    throw new Error('Provided URL can not be handled')
  }

  return Linking.openURL(url)
}
